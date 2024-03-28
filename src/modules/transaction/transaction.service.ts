import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import {
  Transaction,
  Transaction as TransactionEntity,
} from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import {
  Between,
  DataSource,
  EntityManager,
  In,
  MoreThanOrEqual,
  Repository,
} from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { Account } from "../account/entities/account.entity"
import { ApiError } from "../../common/constants/errors"
import { Category } from "../category/entities/category.entity"
import { AccountHistoryService } from "../accountHistory/accountHistory.service"
import { EditTransactionDto } from "./dto/edit-transaction.dto"
import { DeleteTransactionsDto } from "./dto/delete-transactions.dto"
import { AccountHistoryPoint } from "../accountHistory/entities/accountHistoryPoint.entity"
import { TransactionInterface } from "./transaction.interface"

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly accountHistoryService: AccountHistoryService,
    private readonly dataSource: DataSource,
  ) {}

  private async getFreeDate(dateStr: string) {
    const date = new Date(dateStr)

    const dateBorder = new Date(date.getTime() + 1000).toISOString()

    const latestPoint = await this.transactionRepository.findOne({
      order: {
        date: "DESC",
      },
      where: {
        date: Between(dateStr, dateBorder),
      },
    })
    if (!latestPoint) return dateStr

    const freeDateMs = new Date(latestPoint.date).getTime() + 10

    return new Date(freeDateMs).toISOString()
  }

  async createTransactionTransaction(
    createDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager

    try {
      const transaction = await this.createTransaction({
        manager,
        ...createDto,
      })
      await queryRunner.commitTransaction()
      return transaction
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async createTransaction({
    manager,
    accountId,
    quantity,
    type,
    title,
    categoryId,
    date,
  }: CreateTransactionDto & TransactionInterface): Promise<TransactionEntity> {
    const accountEntity = await manager.findOneBy(Account, {
      id: accountId,
    })
    const categoryEntity = await manager.findOneBy(Category, {
      id: categoryId,
    })

    if (!accountEntity)
      throw new BadRequestException(ApiError.ACCOUNT_NOT_FOUND)
    if (!categoryEntity)
      throw new BadRequestException(ApiError.CATEGORY_NOT_FOUND)

    let newAccountBalance: number = accountEntity.balance
    if (type === "income") newAccountBalance += quantity
    if (type === "expense") newAccountBalance -= quantity

    const freeDate = await this.getFreeDate(date)

    const transaction = new TransactionEntity()
    transaction.account = accountEntity
    transaction.category = categoryEntity
    transaction.date = freeDate
    transaction.type = type
    transaction.quantity = quantity
    transaction.title = title

    accountEntity.balance = newAccountBalance

    await manager.save(accountEntity)
    await manager.save(transaction)

    await this.accountHistoryService.createHistoryPoint(
      manager,
      transaction,
      accountEntity,
      freeDate,
    )

    return transaction
  }

  private async changeTransactionDate(
    manager: EntityManager,
    transaction: TransactionEntity,
    newDate: string,
  ) {
    const freeDate = await this.getFreeDate(newDate)
    await this.accountHistoryService.changeHistoryPointDate(
      manager,
      transaction.id,
      freeDate,
      transaction.date,
      transaction.type,
      transaction.quantity,
    )
    transaction.date = freeDate
    return transaction
  }

  private async changeTransactionQuantity(
    manager: EntityManager,
    transaction: TransactionEntity,
    newQuantity: number,
  ) {
    await this.accountHistoryService.changeHistoryPointBalance(
      manager,
      transaction.id,
      transaction.quantity,
      newQuantity,
      transaction.type,
    )
    transaction.quantity = newQuantity
    return transaction
  }

  private async changeTransactionAccount(
    manager: EntityManager,
    transaction: EditTransactionDto,
  ) {
    const removedTransaction = await this.deleteTransactionById({
      manager,
      id: transaction.id,
    })

    return await this.createTransaction({
      manager,
      ...removedTransaction,
      ...transaction,
    })
  }

  async editTransaction(editTransactionDto: EditTransactionDto) {
    const { id, title, categoryId, accountId, quantity, date } =
      editTransactionDto

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager
    try {
      let transaction = await manager.findOne(Transaction, {
        relations: {
          accountHistoryPoint: true,
        },
        where: { id },
      })
      if (!transaction)
        throw new BadRequestException(ApiError.TRANSACTION_NOT_FOUND)

      transaction.title = title ? title : ""

      if (transaction.accountId !== accountId) {
        transaction = await this.changeTransactionAccount(
          manager,
          editTransactionDto,
        )
      } else {
        if (date !== transaction.date)
          transaction = await this.changeTransactionDate(
            manager,
            transaction,
            date,
          )

        if (transaction.quantity !== quantity)
          transaction = await this.changeTransactionQuantity(
            manager,
            transaction,
            quantity,
          )
      }
      if (transaction.categoryId !== categoryId)
        transaction.category = await manager.findOneBy(Category, {
          id: categoryId,
        })

      const resTransaction = await manager.save(transaction)
      await queryRunner.commitTransaction()

      return resTransaction
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  getTransactionsByAccounts(transactions: TransactionEntity[]) {
    const transByAccounts = [] as Array<TransactionEntity[]>

    const diffAccountIds = new Set()
    transactions.forEach(({ accountId }) => diffAccountIds.add(accountId))

    diffAccountIds.forEach((accountId) => {
      const sameAccountTrans = transactions.filter(
        (trans) => trans.accountId === accountId,
      )
      transByAccounts.push(sameAccountTrans)
    })

    return transByAccounts
  }

  //todo integrate transactions
  async deleteTransactionsByIds(manager: EntityManager, ids: number[]) {
    const deleteTransactions = await manager.find(Transaction, {
      relations: {
        accountHistoryPoint: true,
      },
      where: { id: In(ids) },
    })

    const transactionsByAccounts =
      this.getTransactionsByAccounts(deleteTransactions)

    return await Promise.all(
      transactionsByAccounts.map(async (deleteTransactions) => {
        const deleteTransIds = deleteTransactions.map(({ id }) => id)
        const accountId = deleteTransactions[0].accountId

        let accountBalanceShift = 0
        deleteTransactions.forEach(({ type, quantity }) => {
          if (type === "income") accountBalanceShift -= quantity
          if (type === "expense") accountBalanceShift += quantity
        })

        await manager.increment(
          Account,
          { id: accountId },
          "balance",
          accountBalanceShift,
        )

        let startingTime = deleteTransactions[0].date
        deleteTransactions.forEach(
          ({ date }) => startingTime > date && (startingTime = date),
        )

        const transactions = await manager.find(Transaction, {
          relations: {
            accountHistoryPoint: true,
          },
          order: {
            date: "ASC",
          },
          where: {
            date: MoreThanOrEqual(new Date(startingTime).toUTCString()),
            accountId,
          },
        })

        let quantityGap = 0
        const changedTrans = transactions
          .map(({ id, quantity, type, ...transaction }) => {
            const historyPoint = transaction.accountHistoryPoint

            if (deleteTransIds.includes(id)) {
              quantityGap =
                type === "income"
                  ? quantityGap - quantity
                  : quantityGap + quantity
              return null
            } else {
              historyPoint.balance += quantityGap
              return {
                ...transaction,
                id,
                type,
                quantity,
                accountHistoryPoint: historyPoint,
              }
            }
          })
          .filter((transaction) => !!transaction)

        const deleteHistoryPoints = deleteTransactions.map(
          ({ accountHistoryPoint }) => accountHistoryPoint,
        )

        await manager.delete(
          Transaction,
          deleteTransactions.map(({ id }) => id),
        )

        await manager.delete(
          AccountHistoryPoint,
          deleteHistoryPoints.map(({ id }) => id),
        )

        await manager.save(
          AccountHistoryPoint,
          changedTrans.map(({ accountHistoryPoint }) => accountHistoryPoint),
        )
        await manager.save(Transaction, changedTrans)
      }),
    )
  }
  async deleteTransactionByIdTransaction({ id }: DeleteTransactionsDto) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager
    try {
      await this.deleteTransactionById({ id, manager })

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async deleteTransactionById({
    id,
    manager,
  }: DeleteTransactionsDto & TransactionInterface) {
    const transaction = await manager.findOne(Transaction, {
      relations: {
        accountHistoryPoint: true,
        account: true,
      },
      where: { id },
    })
    if (!transaction)
      throw new BadRequestException(ApiError.TRANSACTION_NOT_FOUND)
    const removedTransaction = await manager.remove(transaction)

    await this.accountHistoryService.deleteHistoryPoint(
      manager,
      transaction,
      transaction.accountHistoryPoint,
    )

    const account = transaction.account

    let accBalanceDifference =
      transaction.type === "income"
        ? -transaction.quantity
        : +transaction.quantity

    account.balance += accBalanceDifference

    await manager.save(account)

    return removedTransaction
  }

  //todo
  //todo select special
  async getTransByDateGap({
    dateTo,
    dateFrom,
    accountIds,
  }: GetTransactionsDto) {
    if (!dateTo || !dateFrom)
      return await this.transactionRepository.find({
        order: {
          date: "ASC",
        },
        where: {
          accountId: In(accountIds),
        },
        select: {
          account: {
            currency: true,
          },
        },
        relations: {
          account: true,
        },
      })
    else
      return await this.transactionRepository.find({
        order: {
          date: "ASC",
        },
        where: {
          date: Between(dateFrom, dateTo),
          accountId: In(accountIds),
        },
        select: {
          account: {
            currency: true,
          },
        },
        relations: {
          account: true,
        },
      })
  }
}
