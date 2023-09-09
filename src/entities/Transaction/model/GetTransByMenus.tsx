import { DateFilter, ITransaction } from "@entities/Transaction/types.ts"
import { DayType } from "@shared/helpers/TimeGap.ts"
import { transByDate } from "@entities/Transaction/helpers/TransByDate.ts"


interface props {
  dateMenuIds: number[]
  allTransactions: ITransaction[]
  dateFilter: DateFilter
  firstDay: DayType
}

export interface ITransByMenu {
  transactions: ITransaction[],
  dateGap: string,
  dateTo: Date,
  dateFrom: Date,
  menuId: number
}

export const GetTransByMenus = ({ dateMenuIds, allTransactions, dateFilter, firstDay }: props): ITransByMenu[] => {

  return dateMenuIds.map((menuId) => {
    switch (dateFilter) {

      case "day":
        return transByDate.byDay(allTransactions, menuId)

      case "week":
        return transByDate.byWeek(allTransactions, menuId, firstDay)

      case "month":
        return transByDate.byMonth(allTransactions, menuId)

      case "year":
        return transByDate.byYear(allTransactions, menuId)

      case "allTime":
        return transByDate.byAllTime(allTransactions, menuId)

    }
  })

}