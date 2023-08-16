import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetTransByDate } from "@entities/Transaction/helpers/GetTransByDate.ts"
import { useMemo } from "react"
import { DateFilter, ITransaction } from "@entities/Transaction/types.ts"
import { DayType } from "@shared/helpers/TimeGap.ts"


interface props {
  dateMenuIds: number[]
  transactions: ITransaction[]
  dateFilter: DateFilter
  firstDay: DayType
}

export const GetTransByMenus = ({ dateMenuIds, transactions, dateFilter, firstDay }: props) => {

  return dateMenuIds.map((menuId) => {
    return GetTransByDate(transactions, dateFilter, menuId, firstDay)
  })

}