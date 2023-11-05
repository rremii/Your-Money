import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { Between, In, MoreThan, Repository } from "typeorm"
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

@Injectable()
export class TransactionService {
  constructor(
    // @InjectRepository(User)
    // private readonly usersRepository: Repository<User>,
    // @InjectRepository(Account)
    // private readonly accountRepository: Repository<Account>,
    // @InjectRepository(Category)
    // private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    private readonly accountHistoryService: AccountHistoryService,
    private readonly accountService: AccountService,
    private readonly categoryService: CategoryService,
    private readonly usersService: UsersService,
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
    console.log(latestPoint + "--- latest")
    console.log(dateStr, dateBorder)
    if (!latestPoint) return dateStr

    const freeDateMs = new Date(latestPoint.date).getTime() + 10

    return new Date(freeDateMs).toISOString()
  }

  async createTransaction({
    // userId,
    accountId,
    quantity,
    type,
    title,
    categoryId,
    date,
  }: CreateTransactionDto): Promise<Transaction> {
    const accountEntity = await this.accountService.getAccountById(accountId)
    const categoryEntity = await this.categoryService.getCategoryById(
      categoryId,
    )
    // const userEntity = await this.usersService.getUserById(userId)

    if (!accountEntity)
      throw new BadRequestException(ApiError.ACCOUNT_NOT_FOUND)
    if (!categoryEntity)
      throw new BadRequestException(ApiError.CATEGORY_NOT_FOUND)
    // if (!userEntity) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    let newAccountBalance: number = accountEntity.balance
    if (type === "income") newAccountBalance += quantity
    if (type === "expense") newAccountBalance -= quantity

    const freeDate = await this.getFreeDate(date)

    const transaction = new Transaction()
    transaction.account = accountEntity
    // transaction.user = userEntity
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
      // userEntity,
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

  //todo get rid of user-transaction relation
  private async changeTransactionAccount(
    transaction: EditTransactionDto,
    // userId: number,
  ) {
    const removedTransaction = await this.deleteTransactionById({
      id: transaction.id,
    })

    return await this.createTransaction({
      ...removedTransaction,
      ...transaction,
      // userId,
    })
  }

  //todo change account and category
  async editTransaction(editTransactionDto: EditTransactionDto) {
    const { id, title, categoryId, accountId, quantity, date } =
      editTransactionDto

    let transaction = await this.transactionRepository.findOne({
      relations: {
        accountHistoryPoint: true,
        // user: true,
      },
      where: { id },
    })
    if (!transaction)
      throw new BadRequestException(ApiError.TRANSACTION_NOT_FOUND)

    transaction.title = title ? title : ""

    if (transaction.accountId !== accountId) {
      transaction = await this.changeTransactionAccount(
        editTransactionDto,
        // transaction.user.id,
      )
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
      transaction.category = await this.categoryService.getCategoryById(
        categoryId,
      )

    return await transaction.save()
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

    //todo do same to account
    await this.accountHistoryService.deleteHistoryPoint(
      transaction,
      transaction.accountHistoryPoint,
    )

    //
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
    // return await this.transactionRepository.query(`
    //     SELECT * FROM transaction
    //        INNER JOIN "public"."user" ON "transaction"."userId" = "user"."id"
    //             WHERE "public"."user"."id" = ${userId} AND "transaction"."date" BETWEEN '${dateFrom}' and '${dateTo}'
    // `)

    if (!dateTo || !dateFrom)
      return await this.transactionRepository.find({
        order: {
          date: "ASC",
        },
        where: {
          accountId: In(accountIds),
          // user: {
          //   id: userId,
          // },
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
          // user: {
          //   id: userId,
          // },
        },
      })
  }
}
