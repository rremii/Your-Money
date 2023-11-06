import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetHistoryPointsByDateGapQuery } from "@entities/AccountHistoryPoint/api/AccountHistoryPointApi.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { IAccountHistoryPoint, IConvertedHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"
import { ITransaction } from "@entities/Transaction/types.ts"
import { Currency, IAccount } from "@entities/Account/types.ts"

const FilterHistoryByAccId = (initialHistory: IAccountHistoryPoint[], curAccId: number | null) => {
  let history = initialHistory || []

  if (curAccId) {
    history = initialHistory?.filter(({ accountId }) => accountId === curAccId) || []
  }

  return history
}
const AddConvertedBalanceToHistory = (
  historyPoints: IAccountHistoryPoint[],
  getAccountCurrency: (accountId: number) => Currency,
  convertCurrency: (num: number, currency1: Currency, currency2: Currency) => number,
  curCurrency: Currency
) => {


  return historyPoints.map(({ accountId, balance, ...historyPoint }) => {
    const accountCurrency = getAccountCurrency(accountId)
    return {
      ...historyPoint, balance, accountId,
      convertedBalance: RoundDecimal(convertCurrency(balance, accountCurrency, curCurrency), 2)
    }
  })

}

export const useAccountHistoryPoints = (
  accountIds: number[],
  getAccountById: (id: number | null) => IAccount | null
): { history: IConvertedHistoryPoint[] } => {

  const { dateTo, dateFrom } = useTypedSelector(state => state.Date.allTransDateGap)
  const curAccountId = useTypedSelector(state => state.CurAccount.id)
  const curCurrency = useTypedSelector(state => state.SideBar.curCurrency)


  const { data: allHistoryPointsData } = useGetHistoryPointsByDateGapQuery({
    accountIds,
    dateTo: dateTo,
    dateFrom: dateFrom
  }, {
    skip: !accountIds?.length
  })


  const { convertCurrency } = useCurrencyConverter()
  const getAccountCurrency = (accountId: number) => {
    return getAccountById(accountId)?.currency || Currency.DefaultCurrency
  }

  const historyWithConvertedBalance = AddConvertedBalanceToHistory(allHistoryPointsData?.history || [], getAccountCurrency, convertCurrency, curCurrency)
  const history = FilterHistoryByAccId(historyWithConvertedBalance, curAccountId) as IConvertedHistoryPoint[]

  return {
    history
  }

}