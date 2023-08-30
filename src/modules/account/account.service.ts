import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateAccountDto } from "./dto/create-account.dto"
import { Account } from "./entities/account.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Between, LessThan, MoreThan, Repository } from "typeorm"
import { ApiError } from "../../common/constants/errors"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { GetTransactionsDto } from "./dto/get-transactions.dto"
import { defaultAccounts } from "./constants/defaultAccounts"
import { sample } from "rxjs"
import { GetAccountsDto } from "./dto/get-accounts.dto"

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getAccounts({ userId }: GetAccountsDto) {
    return await this.accountRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  async createDefaultAccounts(user: User) {
    return await Promise.all(
      defaultAccounts.map(async (accountData) => {
        const account = this.accountRepository.create(accountData)
        account.user = user

        return await account.save()
      }),
    )
  }

  async createAccount({
    userId,
    color,
    name,
    icon,
  }: CreateAccountDto): Promise<Account> {
    const user = await this.usersRepository.findOneBy({ id: userId })
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const account = new Account()
    account.name = name
    account.icon = icon
    account.color = color
    account.user = user

    await account.save()

    return account
  }

  async createTransaction({
    accountId,
    quantity,
    type,
    title,
    category,
  }: CreateTransactionDto): Promise<Transaction> {
    const account = await this.accountRepository.findOneBy({ id: accountId })
    if (!account) throw new BadRequestException(ApiError.ACCOUNT_NOT_FOUND)

    let newAccountBalance: number = account.balance
    if (type === "income") newAccountBalance += quantity
    if (type === "expense") newAccountBalance -= quantity

    const transaction = new Transaction()
    transaction.account = account
    transaction.category = category
    transaction.type = type
    transaction.quantity = quantity
    transaction.title = title
    transaction.accountBalance = newAccountBalance

    account.balance = newAccountBalance

    await account.save()
    await transaction.save()

    return transaction
  }

  async getTransByDateGap({ dateTo, dateFrom }: GetTransactionsDto) {
    return await this.transactionRepository.find({
      order: {
        date: "ASC",
      },
      where: {
        date: Between(new Date(dateFrom), new Date(dateTo)),
      },
    })
  }
}
