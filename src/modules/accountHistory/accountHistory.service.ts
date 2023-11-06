import { BadRequestException, Injectable } from "@nestjs/common"
import { GetAccountHistoryDto } from "./dto/get-accountHistory.dto"
import {
  And,
  Between,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm"
import { AccountHistoryPoint } from "./entities/accountHistoryPoint.entity"
import { Transaction } from "../transaction/entities/transaction.entity"
import { Account } from "../account/entities/account.entity"
import { User } from "../users/entities/user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { TransactionType } from "../transaction/transaction.interface"

interface getPrevHistoryPointParams {
  date: string
  accountId?: number
  cmpDateFunc: cmpDateFuncType<string>
  userId?: number
  exceptId?: number
  // includeDate?: boolean
}
type cmpDateFuncType<T> = (value: T | FindOperator<T>) => FindOperator<T>

@Injectable()
export class AccountHistoryService {
  constructor(
    @InjectRepository(AccountHistoryPoint)
    private readonly accountHistoryRepository: Repository<AccountHistoryPoint>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  private async getPrevHistoryPoint({
    date,
    accountId,
    exceptId,
    userId,
    cmpDateFunc,
  }: getPrevHistoryPointParams) {
    return this.accountHistoryRepository.findOne({
      order: {
        date: "DESC",
      },
      where: {
        accountId: accountId && accountId,
        id: exceptId && Not(exceptId),
        date: cmpDateFunc(date),
        user: {
          id: userId && userId,
        },
      },
    })
  }

  //todo add pipe to convert str date to date
  async createHistoryPoint(
    transaction: Transaction,
    account: Account,
    // user: User,
    date: string,
  ) {
    const type = transaction.type
    let accBalanceDifference =
      type === "expense" ? -transaction.quantity : +transaction.quantity

    const prevHistoryPoint = await this.getPrevHistoryPoint({
      date,
      accountId: account.id,
      cmpDateFunc: LessThanOrEqual,
    })

    // const freeDate = await this.getFreeDate(date)

    const historyPoint = new AccountHistoryPoint()
    historyPoint.account = account
    // historyPoint.user = user
    historyPoint.transaction = transaction
    historyPoint.date = date
    historyPoint.balance = prevHistoryPoint
      ? prevHistoryPoint.balance + accBalanceDifference
      : accBalanceDifference

    await this.updateHistoryGapBalance(account.id, accBalanceDifference, date)

    return await historyPoint.save()

    // AccountHistoryPoint.find({
    //   where: {
    //     account: {
    //       user: {
    //         id: 1,
    //       },
    //     },
    //   },
    // })
  }

  async deleteHistoryPoint(
    transaction: Transaction,
    historyPoint: AccountHistoryPoint,
  ) {
    const date = historyPoint.date
    const type = transaction.type
    let accBalanceDifference =
      type === "income" ? -transaction.quantity : +transaction.quantity

    await historyPoint.remove()

    await this.updateHistoryGapBalance(
      transaction.accountId,
      accBalanceDifference,
      date,
    )
  }
  private async updateHistoryGapBalance(
    accountId: number,
    balanceDiff: number,
    date1: string,
    date2?: string,
    exceptId?: number,
  ) {
    let dateFrom = date1
    let dateTo = date2
    if (new Date(dateFrom) > new Date(dateTo)) {
      dateFrom = date2
      dateTo = date1
    }

    const historyPoints = await this.accountHistoryRepository.findBy({
      date: dateTo ? Between(dateFrom, dateTo) : MoreThanOrEqual(dateFrom),
      id: exceptId && Not(exceptId),
      accountId,
    })

    const updatedHistoryPoints = historyPoints.map((historyPoint) => ({
      ...historyPoint,
      balance: historyPoint.balance + balanceDiff,
    }))

    console.log(accountId)
    console.log(historyPoints)
    await this.accountHistoryRepository.save(updatedHistoryPoints)

    return historyPoints
  }

  async changeHistoryPointBalance(
    transactionId: number,
    oldQuantity: number,
    newQuantity: number,
    type: "expense" | "income",
  ) {
    const datePoint = await this.accountHistoryRepository.findOne({
      relations: {
        account: true,
      },
      where: {
        transaction: {
          id: transactionId,
        },
      },
    })

    let balanceDiff
    if (type === "expense") balanceDiff = oldQuantity - newQuantity
    else balanceDiff = newQuantity - oldQuantity

    const account = datePoint.account
    account.balance += balanceDiff
    await account.save()

    return await this.updateHistoryGapBalance(
      datePoint.accountId,
      balanceDiff,
      datePoint.date,
    )
  }
  async changeHistoryPointDate(
    transactionId: number,
    newDate: string,
    oldDate: string,
    type: TransactionType,
    quantity: number,
  ) {
    const datePoint = await this.accountHistoryRepository.findOneBy({
      transaction: { id: transactionId },
    })

    let balanceDiff = type === "expense" ? +quantity : -quantity
    if (new Date(oldDate) < new Date(newDate))
      balanceDiff = type === "expense" ? +quantity : -quantity
    else balanceDiff = type === "expense" ? -quantity : +quantity

    await this.updateHistoryGapBalance(
      datePoint.accountId,
      balanceDiff,
      oldDate,
      newDate,
      datePoint.id,
    )

    const prevHistoryPoint = await this.getPrevHistoryPoint({
      date: newDate,
      accountId: datePoint.accountId,
      exceptId: datePoint.id,
      cmpDateFunc: LessThan,
    })

    datePoint.date = newDate
    if (prevHistoryPoint)
      datePoint.balance = prevHistoryPoint.balance - balanceDiff
    else datePoint.balance = type === "expense" ? -quantity : +quantity

    await datePoint.save()
  }

  async getHistoryByDateGap({
    dateTo,
    dateFrom,
    accountIds,
  }: GetAccountHistoryDto) {
    if (dateTo && dateFrom) {
      const historyBorderLeft: AccountHistoryPoint[] = []
      await Promise.all(
        accountIds.map(async (id) => {
          const historyPoint = await this.getPrevHistoryPoint({
            date: dateFrom,
            // userId,
            accountId: id,
            cmpDateFunc: LessThan,
          })
          if (historyPoint) historyBorderLeft.push(historyPoint)
        }),
      )

      const history = await this.accountHistoryRepository.find({
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

      return {
        history: [...historyBorderLeft, ...history],
      }
    } else {
      return await this.accountHistoryRepository.find({
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
    }
  }
}
