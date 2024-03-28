import { Injectable } from "@nestjs/common"
import { GetAccountHistoryDto } from "./dto/get-accountHistory.dto"
import {
  Between,
  EntityManager,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm"
import { AccountHistoryPoint } from "./entities/accountHistoryPoint.entity"
import { Transaction } from "../transaction/entities/transaction.entity"
import { Account } from "../account/entities/account.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { TransactionType } from "../transaction/transaction.interface"

interface getPrevHistoryPointParams {
  date: string
  accountId: number
  cmpDateFunc: cmpDateFuncType<string>
  exceptId?: number
}
type cmpDateFuncType<T> = (value: T | FindOperator<T>) => FindOperator<T>

@Injectable()
export class AccountHistoryService {
  constructor(
    @InjectRepository(AccountHistoryPoint)
    private readonly accountHistoryRepository: Repository<AccountHistoryPoint>,
  ) {}

  private async getPrevHistoryPoint({
    date,
    accountId,
    exceptId,
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
      },
    })
  }

  //todo add pipe to convert str date to date
  async createHistoryPoint(
    manager: EntityManager,
    transaction: Transaction,
    account: Account,
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

    const historyPoint = new AccountHistoryPoint()
    historyPoint.account = account
    historyPoint.transaction = transaction
    historyPoint.date = date
    historyPoint.balance = prevHistoryPoint
      ? prevHistoryPoint.balance + accBalanceDifference
      : accBalanceDifference

    await this.updateHistoryGapBalance(
      manager,
      account.id,
      accBalanceDifference,
      date,
    )

    return await manager.save(historyPoint)
  }

  async deleteHistoryPoint(
    manager: EntityManager,
    transaction: Transaction,
    historyPoint: AccountHistoryPoint,
  ) {
    const date = historyPoint.date
    const type = transaction.type
    let accBalanceDifference =
      type === "income" ? -transaction.quantity : +transaction.quantity

    await manager.remove(historyPoint)

    await this.updateHistoryGapBalance(
      manager,
      transaction.accountId,
      accBalanceDifference,
      date,
    )
  }
  private async updateHistoryGapBalance(
    manager: EntityManager,
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

    const historyPoints = await manager.findBy(AccountHistoryPoint, {
      date: dateTo ? Between(dateFrom, dateTo) : MoreThanOrEqual(dateFrom),
      id: exceptId && Not(exceptId),
      accountId,
    })

    const updatedHistoryPoints = historyPoints.map((historyPoint) => ({
      ...historyPoint,
      balance: historyPoint.balance + balanceDiff,
    }))

    await manager.save(updatedHistoryPoints)

    return historyPoints
  }

  async changeHistoryPointBalance(
    manager: EntityManager,
    transactionId: number,
    oldQuantity: number,
    newQuantity: number,
    type: "expense" | "income",
  ) {
    const datePoint = await manager.findOne(AccountHistoryPoint, {
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

    await manager.save(account)

    return await this.updateHistoryGapBalance(
      manager,
      datePoint.accountId,
      balanceDiff,
      datePoint.date,
    )
  }
  async changeHistoryPointDate(
    manager: EntityManager,
    transactionId: number,
    newDate: string,
    oldDate: string,
    type: TransactionType,
    quantity: number,
  ) {
    const datePoint = await manager.findOneBy(AccountHistoryPoint, {
      transaction: { id: transactionId },
    })

    let balanceDiff = type === "expense" ? +quantity : -quantity
    if (new Date(oldDate) < new Date(newDate))
      balanceDiff = type === "expense" ? +quantity : -quantity
    else balanceDiff = type === "expense" ? -quantity : +quantity

    await this.updateHistoryGapBalance(
      manager,
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
