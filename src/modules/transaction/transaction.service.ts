import {
  BadRequestException,
  Dependencies,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { Between, In, MoreThan, MoreThanOrEqual, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Account } from "../account/entities/account.entity"
import { ApiError } from "../../common/constants/errors"
import { Category } from "../category/entities/category.entity"
import { AccountHistoryService } from "../accountHistory/accountHistory.service"
import { use } from "passport"
import { EditTransactionDto } from "./dto/edit-transaction.dto"
import { DeleteTransactionsDto } from "./dto/delete-transactions.dto"
import { AccountService } from "../account/account.service"
import { CategoryService } from "../category/category.service"
import { UsersService } from "../users/users.service"
import { AccountHistoryPoint } from "../accountHistory/entities/accountHistoryPoint.entity"

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(AccountHistoryPoint)
    private readonly accountHistoryPointRepository: Repository<AccountHistoryPoint>,

    private readonly accountHistoryService: AccountHistoryService,
    private readonly accountService: AccountService, // private readonly categoryService: CategoryService,
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

  async createTransaction({
    accountId,
    quantity,
    type,
    title,
    categoryId,
    date,
  }: CreateTransactionDto): Promise<Transaction> {
    const accountEntity = await this.accountService.getAccountById(accountId)
    const categoryEntity = await this.categoryRepository.findOneBy({
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

    const transaction = new Transaction()
    transaction.account = accountEntity
    transaction.category = categoryEntity
    transaction.date = freeDate
    transaction.type = type
    transaction.quantity = quantity
    transaction.title = title

    accountEntity.balance = newAccountBalance

    await accountEntity.save()
    await transaction.save()

    await this.accountHistoryService.createHistoryPoint(
      transaction,
      accountEntity,
      freeDate,
    )

    return transaction
  }

  private async changeTransactionDate(
    transaction: Transaction,
    newDate: string,
  ) {
    const freeDate = await this.getFreeDate(newDate)
    await this.accountHistoryService.changeHistoryPointDate(
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
    transaction: Transaction,
    newQuantity: number,
  ) {
    await this.accountHistoryService.changeHistoryPointBalance(
      transaction.id,
      transaction.quantity,
      newQuantity,
      transaction.type,
    )
    transaction.quantity = newQuantity
    return transaction
  }

  private async changeTransactionAccount(transaction: EditTransactionDto) {
    const removedTransaction = await this.deleteTransactionById({
      id: transaction.id,
    })

    return await this.createTransaction({
      ...removedTransaction,
      ...transaction,
    })
  }

  async editTransaction(editTransactionDto: EditTransactionDto) {
    const { id, title, categoryId, accountId, quantity, date } =
      editTransactionDto

    let transaction = await this.transactionRepository.findOne({
      relations: {
        accountHistoryPoint: true,
      },
      where: { id },
    })
    if (!transaction)
      throw new BadRequestException(ApiError.TRANSACTION_NOT_FOUND)

    transaction.title = title ? title : ""

    if (transaction.accountId !== accountId) {
      transaction = await this.changeTransactionAccount(editTransactionDto)
    } else {
      if (date !== transaction.date)
        transaction = await this.changeTransactionDate(transaction, date)

      if (transaction.quantity !== quantity)
        transaction = await this.changeTransactionQuantity(
          transaction,
          quantity,
        )
    }
    if (transaction.categoryId !== categoryId)
      transaction.category = await this.categoryRepository.findOneBy({
        id: categoryId,
      })

    return await transaction.save()
  }

  getTransactionsByAccounts(transactions: Transaction[]) {
    const transByAccounts = [] as Array<Transaction[]>

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
  async deleteTransactionsByIds(ids: number[]) {
    const deleteTransactions = await this.transactionRepository.find({
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

        await this.accountService.changeAccountBalanceBy(
          accountBalanceShift,
          accountId,
        )

        let startingTime = deleteTransactions[0].date
        deleteTransactions.forEach(
          ({ date }) => startingTime > date && (startingTime = date),
        )

        const transactions = await this.transactionRepository.find({
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

        await this.transactionRepository.delete(
          deleteTransactions.map(({ id }) => id),
        )

        await this.accountHistoryPointRepository.delete(
          deleteHistoryPoints.map(({ id }) => id),
        )

        await this.accountHistoryPointRepository.save(
          changedTrans.map(({ accountHistoryPoint }) => accountHistoryPoint),
        )
        await this.transactionRepository.save(changedTrans)
      }),
    )
  }

  async deleteTransactionById({ id }: DeleteTransactionsDto) {
    const transaction = await this.transactionRepository.findOne({
      relations: {
        accountHistoryPoint: true,
        account: true,
      },
      where: { id },
    })
    if (!transaction)
      throw new BadRequestException(ApiError.TRANSACTION_NOT_FOUND)
    const removedTransaction = await transaction.remove()

    await this.accountHistoryService.deleteHistoryPoint(
      transaction,
      transaction.accountHistoryPoint,
    )

    const account = transaction.account

    let accBalanceDifference =
      transaction.type === "income"
        ? -transaction.quantity
        : +transaction.quantity

    account.balance += accBalanceDifference
    await account.save()
    //

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
