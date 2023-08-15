import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetTransByDate } from "@entities/Transaction/helpers/GetTransByDate.ts"
import { useMemo } from "react"


export const useGetTransByMenus = () => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)

  const { transactions: allTransactions } = useGetTransactions()


  return useMemo(() => dateMenuIds.map((menuId) => {
    return GetTransByDate(allTransactions, dateFilter, menuId, firstDay)
  }), [dateFilter, dateMenuIds, firstDay])

}