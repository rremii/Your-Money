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
  console.log(transMenuIds)


  const { transactions: allTransactions } = useGetTransactions()
  // const [transMenuIds, setMenuIds] = useState([-4, -3, -2, -1, 0, 1, 2, 3, 4])
  // const [transMenus, setTransMenus] = useState()


  // useEffect(() => {
  //   const includeBorderIdRight = index < transMenuIds[transMenuIds.length - 1] - 3
  //   const includeBorderIdLeft = index > transMenuIds[0] + 3
  //
  //
  //   if (!includeBorderIdRight) {
  //     const set = new Set([...transMenuIds, index + 1, index + 2, index + 3, index + 4])
  //     setMenuIds([...set])
  //   }
  //   if (!includeBorderIdLeft) {
  //     const set = new Set([index - 4, index - 3, index - 2, index - 1, ...transMenuIds])
  //     setMenuIds([...set])
  //   }
  // }, [index])


  // useEffect(() => {
  //   console.log(transMenuIds)
  //
  //   if (transMenuIds.length <= 9) return
  //
  //   let borderLeft: number = 0
  //   // transMenuIds.forEach((menuId, id) => {
  //   //   if (menuId === index - 3) borderLeft = id
  //   // })
  //
  //   let borderRight: number = transMenuIds.length - 1
  //   transMenuIds.forEach((menuId, id) => {
  //     if (menuId === index + 4) borderRight = id
  //   })
  //   if (borderLeft !== 0 || borderRight !== transMenuIds.length - 1) {
  //     const trimedIds = transMenuIds.slice(borderLeft, borderRight)
  //     setMenuIds(trimedIds)
  //   }
  //
  // }, [transMenuIds])


  const transMenus = transMenuIds.map((menuId) => {
    return GetTransMenuData(allTransactions, "week", menuId)
  })

  return transMenus


}