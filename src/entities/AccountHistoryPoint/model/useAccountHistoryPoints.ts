import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetHistoryPointsByDateGapQuery } from "@entities/AccountHistoryPoint/api/AccountHistoryPointApi.ts"
import { useEffect } from "react"
import { IAccountHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"

export const useAccountHistoryPoints = (userId?: number) => {

  const { dateTo, dateFrom } = useTypedSelector(state => state.Date.allTransDateGap)
  const curAccountId = useTypedSelector(state => state.CurAccount.id)

  const { data: allHistoryPointsData } = useGetHistoryPointsByDateGapQuery({
    userId,
    dateTo: dateTo,
    dateFrom: dateFrom
  }, {
    skip: !userId
  })

  let history = allHistoryPointsData?.history || []
  let historyBorderLeft = allHistoryPointsData?.historyBorderLeft || []

  useEffect(() => {
    if (curAccountId) {
      history = allHistoryPointsData?.history?.filter(({ id }) => id === curAccountId) || []
      historyBorderLeft = allHistoryPointsData?.historyBorderLeft?.filter(({ id }) => id === curAccountId) || []
    }
  }, [curAccountId])

  return {
    historyBorderLeft,
    historyBorderRight: allHistoryPointsData?.historyBorderRight || null,
    history: history
  }

}