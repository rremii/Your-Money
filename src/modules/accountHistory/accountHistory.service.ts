import { BadRequestException, Injectable } from "@nestjs/common"
import { GetAccountHistoryDto } from "./dto/get-accountHistory.dto"
import {
  Between,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  Repository,
} from "typeorm"
import { AccountHistoryPoint } from "./entities/accountHistoryPoint.entity"
import { Transaction } from "../transaction/entities/transaction.entity"
import { Account } from "../account/entities/account.entity"
import { User } from "../users/entities/user.entity"

@Injectable()
export class AccountHistoryService {
  constructor(
    private readonly accountHistoryPoint: Repository<AccountHistoryPoint>, // @InjectRepository(Transaction) // private readonly accountRepository: Repository<Account>, // @InjectRepository(Account) // private readonly usersRepository: Repository<User>, // @InjectRepository(User)
  ) {}

  async createHistoryPoint(
    transaction: Transaction,
    account: Account,
    user: User,
    balance: number,
  ) {
    const historyPoint = new AccountHistoryPoint()
    historyPoint.account = account
    historyPoint.user = user
    historyPoint.transaction = transaction
    historyPoint.balance = balance
  }

  async getHistoryByDateGap({
    dateTo,
    dateFrom,
    userId,
  }: GetAccountHistoryDto) {
    if (dateTo && dateFrom) {
      const history = await this.accountHistoryPoint.find({
        where: {
          date: Between(new Date(dateFrom), new Date(dateTo)),
          user: {
            id: userId,
          },
        },
      })
      //todo add order
      const historyBorderLeft = await this.accountHistoryPoint.find({
        take: 1,
        where: {
          date: LessThan(new Date(dateFrom)),
          user: {
            id: userId,
          },
        },
      })
      const historyBorderRight = await this.accountHistoryPoint.find({
        take: 1,
        where: {
          date: MoreThan(new Date(dateTo)),
          user: {
            id: userId,
          },
        },
      })
      console.log(history)
      console.log(historyBorderLeft)
      console.log(historyBorderRight)
    } else {
      return await this.accountHistoryPoint.find({
        where: {
          user: {
            id: userId,
          },
        },
      })
      console.log(history)
    }
  }
}
