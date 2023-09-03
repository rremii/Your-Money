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
  ) {}

  async createTransaction({
    userId,
    accountId,
    quantity,
    type,
    title,
    categoryId,
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
    // transaction.categoryIcon = categoryIcon
    transaction.type = type
    transaction.quantity = quantity
    transaction.title = title
    transaction.accountBalance = newAccountBalance

    accountEntity.balance = newAccountBalance

    await accountEntity.save()
    await transaction.save()

    return transaction
  }

  //todo
  //todo select special
  async getTransByDateGap({ dateTo, dateFrom, userId }: GetTransactionsDto) {
    if (!dateTo || !dateFrom)
      return await this.transactionRepository.find({
        relations: {
          account: true,
          category: true,
        },
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
        relations: {
          account: true,
          category: true,
        },
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
