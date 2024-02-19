import { IConvertedTransaction } from "@entities/Transaction/types.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"
import { DayType } from "@shared/constants/Days.ts"

class TransByDate {
  byDay(
    allTransactions: IConvertedTransaction[],
    menuId: number,
    initDate?: string,
  ) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetDayGap(menuId, initDate)
    const transactions = allTransactions.filter(({ date }) =>
      IsDateBetween(dateFrom, new Date(date), dateTo, "left"),
    )
    return {
      transactions,
      dateGap,
      dateTo,
      dateFrom,
      menuId,
    }
  }

  byWeek(
    allTransactions: IConvertedTransaction[],
    menuId: number,
    firstDay?: DayType,
    initDate?: string,
  ) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetWeekGap(
      firstDay || "Sun",
      menuId,
      initDate,
    )
    const transactions = allTransactions.filter(({ date }) =>
      IsDateBetween(dateFrom, new Date(date), dateTo, "left"),
    )
    return {
      transactions,
      dateGap,
      dateTo,
      dateFrom,
      menuId,
    }
  }

  byMonth(
    allTransactions: IConvertedTransaction[],
    menuId: number,
    initDate?: string,
  ) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetMonthGap(menuId, initDate)
    const transactions = allTransactions.filter(({ date }) =>
      IsDateBetween(dateFrom, new Date(date), dateTo, "left"),
    )
    return {
      transactions,
      dateGap,
      dateTo,
      dateFrom,
      menuId,
    }
  }

  byYear(
    allTransactions: IConvertedTransaction[],
    menuId: number,
    initDate?: string,
  ) {
    const { dateGap, dateFrom, dateTo } = timeGap.GetYearGap(menuId, initDate)
    const transactions = allTransactions.filter(({ date }) =>
      IsDateBetween(dateFrom, new Date(date), dateTo, "left"),
    )
    return {
      transactions,
      dateGap,
      dateTo,
      dateFrom,
      menuId,
    }
  }

  byAllTime(allTransactions: IConvertedTransaction[], menuId: number) {
    // const sortedByDateTrans = allTransactions.sort((prev, cur) => prev.date > cur.date ? 1 : -1)
    let yearFrom = new Date().getFullYear()
    let yearTo = new Date().getFullYear()

    if (allTransactions.length) {
      yearFrom = new Date(allTransactions[0].date).getFullYear()
      yearTo = new Date(
        allTransactions[allTransactions.length - 1].date,
      ).getFullYear()
    }

    yearTo++

    const dateFrom = new Date(yearFrom, 0, 1)
    const dateTo = new Date(yearTo, 0, 1)

    const dateGap = "All time"

    return {
      transactions: allTransactions,
      dateGap,
      dateTo,
      dateFrom,
      menuId,
    }
  }
}

export const transByDate = new TransByDate()
