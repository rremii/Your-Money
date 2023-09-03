import { ITransaction } from "@entities/Transaction/types.ts"
import { DayType, timeGap } from "@shared/helpers/TimeGap.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"


class TransByDate {

  byDay(allTransactions: ITransaction[], menuId: number) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetDayGap(menuId)
    const transactions = allTransactions.filter(({ date }) => IsDateBetween(dateFrom, new Date(date), dateTo, "left"))
    return {
      transactions, dateGap, dateTo, dateFrom, menuId
    }
  }

  byWeek(allTransactions: ITransaction[], menuId: number, firstDay?: DayType) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetWeekGap(firstDay || "Sun", menuId)
    const transactions = allTransactions.filter(({ date }) => IsDateBetween(dateFrom, new Date(date), dateTo, "left"))
    return {
      transactions, dateGap, dateTo, dateFrom, menuId
    }
  }

  byMonth(allTransactions: ITransaction[], menuId: number) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetMonthGap(menuId)
    const transactions = allTransactions.filter(({ date }) => IsDateBetween(dateFrom, new Date(date), dateTo, "left"))
    return {
      transactions, dateGap, dateTo, dateFrom, menuId
    }
  }

  byYear(allTransactions: ITransaction[], menuId: number) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetYearGap(menuId)
    const transactions = allTransactions.filter(({ date }) => IsDateBetween(dateFrom, new Date(date), dateTo, "left"))
    return {
      transactions, dateGap, dateTo, dateFrom, menuId
    }
  }

  byAllTime(allTransactions: ITransaction[], menuId: number) {
    // const sortedByDateTrans = allTransactions.sort((prev, cur) => prev.date > cur.date ? 1 : -1)

    const yearFrom = new Date(allTransactions[0].date).getFullYear()
    let yearTo = new Date(allTransactions[allTransactions.length - 1].date).getFullYear()

    yearTo++

    const dateFrom = new Date(yearFrom, 0, 1)
    const dateTo = new Date(yearTo, 0, 1)

    const dateGap = "All time"

    return {
      transactions: allTransactions, dateGap, dateTo, dateFrom, menuId
    }
  }
}

export const transByDate = new TransByDate()
