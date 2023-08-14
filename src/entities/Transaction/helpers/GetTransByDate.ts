import TimeGap, { DayType } from "@shared/helpers/TimeGap.ts"
import { DateFilter, ITransaction } from "@entities/Transaction/types.ts"

export const GetTransByDate = (allTransactions: ITransaction[] = [], filter: DateFilter = "week", menuId: number = 0, firstDay?: DayType) => {

  switch (filter) {
    case "day": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetDayGap(menuId)
      const transactions = allTransactions.filter(({ date }) => date >= dateFrom && date < dateTo)

      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "week": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetWeeKGap(firstDay || "Sun", menuId)
      const transactions = allTransactions.filter(({ date }) => date >= dateFrom && date < dateTo)
      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "month": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetMonthGap(menuId)
      const transactions = allTransactions.filter(({ date }) => date >= dateFrom && date < dateTo)
      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "year": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetYearGap(menuId)
      const transactions = allTransactions.filter(({ date }) => date >= dateFrom && date < dateTo)
      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "allTime": {
      const sortedByDateTrans = allTransactions.sort((prev, cur) => prev.date > cur.date ? 1 : -1)

      const yearFrom = sortedByDateTrans[0].date.getFullYear()
      let yearTo = sortedByDateTrans[sortedByDateTrans.length - 1].date.getFullYear()

      yearTo++

      const dateFrom = new Date(yearFrom, 0, 1)
      const dateTo = new Date(yearTo, 0, 1)

      const dateGap = "All time"

      return {
        transactions: sortedByDateTrans, dateGap, dateTo, dateFrom, menuId
      }

    }
  }
}