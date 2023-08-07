import { ITransaction, useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import TimeGap, { DayType } from "@shared/helpers/TimeGap.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetTransByDate } from "@entities/Transaction/helpers/GetTransByDate.ts"

export type DateFiler = "day" | "week" | "month" | "year"


export const useGetTransByMenus = () => {
  const DateMenuIds = useTypedSelector(state => state.Transactions.DateMenuIds)

  const { transactions: allTransactions } = useGetTransactions()

  return DateMenuIds.map((menuId) => {
    return GetTransByDate(allTransactions, "week", menuId)
  })

}