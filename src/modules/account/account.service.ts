import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateAccountDto } from "./dto/create-account.dto"
import { Account } from "./entities/account.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/entities/user.entity"
import { Repository } from "typeorm"
import { ApiError } from "../../common/constants/errors"
import { defaultAccounts } from "./constants/defaultAccounts"
import { GetAccountsDto } from "./dto/get-accounts.dto"
import { Transaction } from "../transaction/entities/transaction.entity"

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

  async getAccountById(id: number) {
    return this.accountRepository.findOneBy({ id })
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
    currency,
  }: CreateAccountDto): Promise<Account> {
    const user = await this.usersRepository.findOneBy({ id: userId })
    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    const account = new Account()
    account.name = name
    account.icon = icon
    account.color = color
    account.currency = currency
    account.user = user

    await account.save()

    return account
  }
}
