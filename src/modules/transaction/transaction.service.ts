import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { Between, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Account } from "../account/entities/account.entity"
import { ApiError } from "../../common/constants/errors"
import { Category } from "../category/entities/category.entity"
import { AccountHistoryService } from "../accountHistory/accountHistory.service"
import { use } from "passport"
import { EditTransactionDto } from "./dto/edit-transaction.dto"
import { DeleteTransactionsDto } from "./dto/delete-transactions.dto"

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly accountHistoryService: AccountHistoryService,
  ) {}

  async createTransaction({
    userId,
    accountId,
    quantity,
    type,
    title,
    categoryId,
    date,
  }: CreateTransactionDto): Promise<Transaction> {
    const accountEntity = await this.accountRepository.findOneBy({
      id: accountId,
    })
    const categoryEntity = await this.categoryRepository.findOneBy({
      id: categoryId,
    })
    const userEntity = await this.usersRepository.findOneBy({
      id: userId,
    })

    if (!accountEntity)
      throw new BadRequestException(ApiError.ACCOUNT_NOT_FOUND)
    if (!categoryEntity)
      throw new BadRequestException(ApiError.CATEGORY_NOT_FOUND)
    if (!userEntity) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    let newAccountBalance: number = accountEntity.balance
    if (type === "income") newAccountBalance += quantity
    if (type === "expense") newAccountBalance -= quantity

    const transaction = new Transaction()
    transaction.account = accountEntity
    transaction.user = userEntity
    transaction.category = categoryEntity
    transaction.date = new Date(date)
    transaction.type = type
    transaction.quantity = quantity
    transaction.title = title
    // transaction.accountBalance = newAccountBalance

    accountEntity.balance = newAccountBalance

    await accountEntity.save()
    await transaction.save()

    await this.accountHistoryService.createHistoryPoint(
      transaction,
      accountEntity,
      userEntity,
      newAccountBalance,
      date,
    )

    return transaction
  }

  async editTransaction({
    quantity,
    id,
    type,
    title,
    date,
  }: EditTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      relations: {
        accountHistoryPoint: true,
      },
      where: { id },
    })
    if (!transaction)
      throw new BadRequestException(ApiError.TRANSACTION_NOT_FOUND)

    if (new Date(date) !== transaction.date)
      await this.accountHistoryService.changeHistoryPointDate(
        transaction.id,
        new Date(date),
        transaction.date,
        type,
        transaction.quantity,
      )

    if (transaction.quantity !== quantity)
      await this.accountHistoryService.changeHistoryPointBalance(
        transaction.id,
        transaction.quantity,
        quantity,
      )

    transaction.type = type
    transaction.date = new Date(date)
    transaction.title = title ? title : ""
    transaction.type = type
    transaction.quantity = quantity

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
    await transaction.remove()

    // console.log(transaction)
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
  }

  //todo
  //todo select special
  async getTransByDateGap({ dateTo, dateFrom, userId }: GetTransactionsDto) {
    console.log(userId)
    console.log(dateTo)
    console.log(dateFrom)
    // return await this.transactionRepository.query(`
    //     SELECT * FROM transaction
    //         JOIN "public"."user" ON "transaction"."userId" = "user"."id"
    //             WHERE "public"."user"."id" = ${userId}
    // `)

    // return await this.transactionRepository.find({
    // relations: {
    //   account: true,
    //   category: true,

    //   accountHistoryPoint: true,
    // },
    //   order: {
    //     date: "ASC",
    //   },
    //   where: {
    //     date: Between(new Date(dateFrom), new Date(dateTo)),
    //     user: {
    //       id: userId,
    //     },
    //   },
    // })

    if (!dateTo || !dateFrom)
      return await this.transactionRepository.find({
        // relations: {
        //   account: true,
        //   category: true,
        // },
        order: {
          date: "ASC",
        },
        where: {
          user: {
            id: userId,
          },
        },
      })
    else
      return await this.transactionRepository.find({
        // relations: {
        //   account: true,
        //   category: true,
        //   accountHistoryPoint: true,
        // },
        order: {
          date: "ASC",
        },
        where: {
          date: Between(new Date(dateFrom), new Date(dateTo)),
          user: {
            id: userId,
          },
        },
      })
  }
}
