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
import { InjectRepository } from "@nestjs/typeorm"
import { TransactionType } from "../transaction/transaction.interface"

@Injectable()
export class AccountHistoryService {
  constructor(
    @InjectRepository(AccountHistoryPoint)
    private readonly accountHistoryRepository: Repository<AccountHistoryPoint>,
  ) {}

  async createHistoryPoint(
    transaction: Transaction,
    account: Account,
    user: User,
    balance: number,
    date: string,
  ) {
    //todo add pipe to convert str date to date
    const historyPoint = new AccountHistoryPoint()
    historyPoint.account = account
    historyPoint.user = user
    historyPoint.transaction = transaction
    historyPoint.balance = balance
    historyPoint.date = new Date(date)

    const type = transaction.type
    let accBalanceDifference =
      type === "income" ? -transaction.quantity : +transaction.quantity

    await this.updateHistoryGapBalance(accBalanceDifference, new Date(date))

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

    await this.updateHistoryGapBalance(accBalanceDifference, date)

    await historyPoint.remove()
  }
  private async updateHistoryGapBalance(
    balanceDiff: number,
    dateFrom: Date,
    dateTo?: Date,
  ) {
    const compareDateFunc = dateTo
      ? Between(dateFrom, dateTo)
      : MoreThan(dateFrom)

    const historyPoints = await this.accountHistoryRepository.findBy({
      date: compareDateFunc,
    })

    const updatedHistoryPoints = historyPoints.map((historyPoint) => ({
      ...historyPoint,
      balance: historyPoint.balance + balanceDiff,
    }))

    await this.accountHistoryRepository.save(updatedHistoryPoints)

    return historyPoints
  }

  // async editHistoryPoint(
  //   transactionId: number,
  //   quantity: number,
  //   type: "expense" | "income",
  //   date: Date,
  // ) {
  //   const historyPoint = await this.accountHistoryRepository.findOneBy({
  //     transaction: {
  //       id: transactionId,
  //     },
  //   })
  //
  //   if (historyPoint.date !== date) await this.changeHistoryPointDate()
  //   if (historyPoint.qua !== date) await this.changeHistoryPointDate()
  // }

  //100
  //80-20
  //50-30
  //90-10

  async changeHistoryPointBalance(
    transactionId: number,
    oldQuantity: number,
    newQuantity: number,
  ) {
    const datePoint = await this.accountHistoryRepository.findOneBy({
      transaction: { id: transactionId },
    })
    const balanceDiff = oldQuantity - newQuantity

    return await this.updateHistoryGapBalance(balanceDiff, datePoint.date)
  }
  async changeHistoryPointDate(
    transactionId: number,
    newDate: Date,
    oldDate: Date,
    type: TransactionType,
    quantity: number,
  ) {
    const datePoint = await this.accountHistoryRepository.findOneBy({
      transaction: { id: transactionId },
    })

    const balanceDiff = type === "expense" ? +quantity : -quantity

    const historyPoints = await this.updateHistoryGapBalance(
      balanceDiff,
      oldDate,
      newDate,
    )

    datePoint.date = newDate
    if (historyPoints.length)
      datePoint.balance =
        historyPoints[historyPoints.length - 1].balance - balanceDiff
  }

  async getHistoryByDateGap({
    dateTo,
    dateFrom,
    userId,
  }: GetAccountHistoryDto) {
    if (dateTo && dateFrom) {
      const history = await this.accountHistoryRepository.find({
        where: {
          date: Between(new Date(dateFrom), new Date(dateTo)),
          user: {
            id: userId,
          },
        },
      })
      //todo add order
      const historyBorderLeft = await this.accountHistoryRepository.find({
        take: 1,
        where: {
          date: LessThan(new Date(dateFrom)),
          user: {
            id: userId,
          },
        },
      })
      const historyBorderRight = await this.accountHistoryRepository.find({
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
      return await this.accountHistoryRepository.find({
        relations: {
          transaction: true,
          account: true,
        },
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
