import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetHistoryPointsByDateGapQuery } from "@entities/AccountHistoryPoint/api/AccountHistoryPointApi.ts"

export const useAccountHistoryPoints = (userId?: number) => {

  const { dateTo, dateFrom } = useTypedSelector(state => state.Date.allTransDateGap)

  const { data: historyPointsData } = useGetHistoryPointsByDateGapQuery({
    userId,
    dateTo: dateTo,
    dateFrom: dateFrom
  }, {
    skip: !userId
  })


  return {
    historyBorderLeft: historyPointsData?.historyBorderLeft || null,
    historyBorderRight: historyPointsData?.historyBorderRight || null,
    history: historyPointsData?.history || []
  }

}