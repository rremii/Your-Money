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
import { EditAccountDto } from "./dto/edit-account.dto"
import { TransactionService } from "../transaction/transaction.service"

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly transactionService: TransactionService,
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

  async changeAccountBalanceBy(balanceShift: number, accountId: number) {
    return await this.accountRepository.increment(
      { id: accountId },
      "balance",
      balanceShift,
    )
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

  async deleteAccount(id: number) {
    const accountWithTransIds = await this.accountRepository.findOne({
      where: { id },
      select: {
        transactions: {
          id: true,
        },
      },
      relations: {
        transactions: true,
      },
    })

    const transactionsIds = accountWithTransIds.transactions.map(({ id }) => id)

    await this.transactionService.deleteTransactionsByIds(transactionsIds)

    await this.accountRepository.delete({
      id: accountWithTransIds.id,
    })
    return accountWithTransIds
  }

  async editAccount({ id, color, name, icon }: EditAccountDto) {
    const account = await this.accountRepository.findOneBy({ id })

    if (!account) throw new BadRequestException(ApiError.ACCOUNT_NOT_FOUND)

    account.name = name
    account.icon = icon
    account.color = color

    await account.save()

    return account
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

    const existAccount = await this.accountRepository.findOneBy({
      name,
      user: {
        id: userId,
      },
    })
    if (existAccount) throw new BadRequestException(ApiError.ACCOUNT_EXIST)

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
