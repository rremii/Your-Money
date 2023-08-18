import { DateFilter, ITransaction } from "@entities/Transaction/types.ts"
import { ITransByMenu } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"
import { DayType, timeGap } from "@shared/helpers/TimeGap.ts"
import { transByDate } from "@entities/Transaction/helpers/TransByDate.ts"
import { dateGapDayIn } from "@entities/Transaction/helpers/DateGapDayIn.ts"


export interface IExtraInfo {
  title: string
  quantity: number
}


interface props {
  dateMenuIds: number[]
  allTransactions: ITransaction[]
  dateFilter: DateFilter
  firstDay: DayType
}

export const GetExtraInfoByMenus = ({ dateFilter, firstDay, allTransactions, dateMenuIds }: props): IExtraInfo[][] => {
  return dateMenuIds.map((menuId) => {
    switch (dateFilter) {
      case "allTime": {
      }
        break
      case "year": {
      }
        break
      case "month": {
      }
        break
      case "week": {

      }
        break
      case "day": {
        const { dateTo, dateFrom, transactions: dayTransactions } = transByDate.byDay(allTransactions, menuId)

        const week = timeGap.GetWeekGap(firstDay, 0, dateTo)
        const month = timeGap.GetMonthGap(0, dateFrom)

        const dayQuantity = dayTransactions
          .reduce((acc, cur) => acc + cur.quantity, 0)

        const weekQuantity = allTransactions
          .filter(({ date }) => IsDateBetween(week.dateFrom, date, week.dateTo, "left"))
          .reduce((acc, cur) => acc + cur.quantity, 0)

        const monthQuantity = allTransactions
          .filter(({ date }) => IsDateBetween(month.dateFrom, date, month.dateTo, "left"))
          .reduce((acc, cur) => acc + cur.quantity, 0)

        return [{
          title: "day",
          quantity: dayQuantity
        }, {
          title: "week",
          quantity: weekQuantity
        }, {
          title: "month",
          quantity: monthQuantity
        }]


      }
    }
  })
}