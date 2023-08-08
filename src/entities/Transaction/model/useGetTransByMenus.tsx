import { ITransaction, useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import TimeGap, { DayType } from "@shared/helpers/TimeGap.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetTransByDate } from "@entities/Transaction/helpers/GetTransByDate.ts"

export type DateFiler = "day" | "week" | "month" | "year"


export const useGetTransByMenus = () => {
  const dateMenuIds = useTypedSelector(state => state.Transactions.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Transactions.dateFilter)

  const { transactions: allTransactions } = useGetTransactions()

  return dateMenuIds.map((menuId) => {
    return GetTransByDate(allTransactions, dateFilter, menuId)
  })

}