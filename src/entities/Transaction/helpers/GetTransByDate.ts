import TimeGap, { DayType } from "@shared/helpers/TimeGap.ts"
import { DateFiler } from "@entities/Transaction/model/useGetTransByMenus.tsx"
import { ITransaction } from "@entities/Transaction/types.ts"

export const GetTransByDate = (allTransactions: ITransaction[], filter: DateFiler, menuId: number, firstDay?: DayType) => {

  switch (filter) {
    case "day": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetDayGap(menuId)
      const transactions = allTransactions.filter(({ date }) => date > dateFrom && date < dateTo)

      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "week": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetWeeKGap(firstDay || "Sun", menuId)
      const transactions = allTransactions.filter(({ date }) => date > dateFrom && date < dateTo)
      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "month": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetMonthGap(menuId)
      const transactions = allTransactions.filter(({ date }) => date > dateFrom && date < dateTo)
      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
    case "year": {
      const { dateGap, dateFrom, dateTo } = TimeGap.GetYearGap(menuId)
      const transactions = allTransactions.filter(({ date }) => date > dateFrom && date < dateTo)
      return {
        transactions, dateGap, dateTo, dateFrom, menuId
      }
    }
  }
}