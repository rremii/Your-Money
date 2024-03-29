import {
  DateFilter,
  IConvertedTransaction,
} from "@entities/Transaction/types.ts"
import { transByDate } from "@entities/Transaction/helpers/TransByDate.ts"
import { DayType } from "@shared/constants/Days.ts"

interface props {
  dateMenuIds: number[]
  allTransactions: IConvertedTransaction[]
  dateFilter: DateFilter
  firstDay: DayType
  initDate: string
}

export interface ITransByMenu {
  transactions: IConvertedTransaction[]
  dateGap: string
  dateTo: Date
  dateFrom: Date
  menuId: number
}

export const GetTransByMenus = ({
  dateMenuIds,
  allTransactions,
  dateFilter,
  firstDay,
  initDate,
}: props): ITransByMenu[] => {
  return dateMenuIds.map((menuId) => {
    switch (dateFilter) {
      case "day":
        return transByDate.byDay(allTransactions, menuId, initDate)

      case "week":
        return transByDate.byWeek(allTransactions, menuId, firstDay, initDate)

      case "month":
        return transByDate.byMonth(allTransactions, menuId, initDate)

      case "year":
        return transByDate.byYear(allTransactions, menuId, initDate)

      case "allTime":
        return transByDate.byAllTime(allTransactions, menuId)
    }
  })
}
