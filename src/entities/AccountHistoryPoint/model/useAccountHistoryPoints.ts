import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetHistoryPointsByDateGapQuery } from "@entities/AccountHistoryPoint/api/AccountHistoryPointApi.ts"

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

  if (curAccountId) {
    history = allHistoryPointsData?.history?.filter(({ accountId }) => accountId === curAccountId) || []
  }


  return {
    history
  }

}