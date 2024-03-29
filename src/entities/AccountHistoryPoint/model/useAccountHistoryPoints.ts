import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetHistoryPointsByDateGapQuery } from "@entities/AccountHistoryPoint/api/AccountHistoryPointApi.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { IConvertedHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"
import { IAccount } from "@entities/Account/types.ts"
import { AddConvertedBalanceToHistory } from "@entities/AccountHistoryPoint/model/AddConvertedBalanceToHistory.ts"
import { FilterHistoryByAccId } from "@entities/AccountHistoryPoint/model/FilterHistoryByAccId.ts"
import { Currency } from "@entities/Currency/types.ts"

export const useAccountHistoryPoints = (
  accountIds: number[],
  getAccountById: (id: number | null) => IAccount | null,
): { history: IConvertedHistoryPoint[] } => {
  const dateTo = useTypedSelector((state) => state.Date.allTransDateGap.dateTo)
  const dateFrom = useTypedSelector(
    (state) => state.Date.allTransDateGap.dateFrom,
  )
  const curAccountId = useTypedSelector((state) => state.CurAccount.id)
  const curCurrency = useTypedSelector((state) => state.Settings.curCurrency)

  const { data: allHistoryPointsData } = useGetHistoryPointsByDateGapQuery(
    {
      accountIds,
      dateTo: dateTo,
      dateFrom: dateFrom,
    },
    {
      skip: !accountIds?.length,
    },
  )

  const { convertCurrency } = useCurrencyConverter()
  const getAccountCurrency = (accountId: number) => {
    return getAccountById(accountId)?.currency || Currency.DefaultCurrency
  }

  const historyWithConvertedBalance = AddConvertedBalanceToHistory(
    allHistoryPointsData?.history || [],
    getAccountCurrency,
    convertCurrency,
    curCurrency,
  )

  const history = FilterHistoryByAccId(
    historyWithConvertedBalance,
    curAccountId,
  ) as IConvertedHistoryPoint[]
  return {
    history,
  }
}
