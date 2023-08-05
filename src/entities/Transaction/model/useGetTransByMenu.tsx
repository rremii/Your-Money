import { ITransaction, useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import TimeGap, { DayType } from "@shared/helpers/TimeGap.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useEffect, useState } from "react"

export type DateFiler = "day" | "week" | "month" | "year"

const GetTransMenuData = (allTransactions: ITransaction[], filter: DateFiler, menuId: number, firstDay?: DayType) => {

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

export const useGetTransByMenu = () => {
  const transMenuIds = useTypedSelector(state => state.Transactions.transMenuIds)

  const { transactions: allTransactions } = useGetTransactions()

  return transMenuIds.map((menuId) => {
    return GetTransMenuData(allTransactions, "week", menuId)
  })

}