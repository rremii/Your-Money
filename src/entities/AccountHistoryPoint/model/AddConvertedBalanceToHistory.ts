import { IAccountHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { Currency } from "@entities/Currency/types.ts"

export const AddConvertedBalanceToHistory = (
  historyPoints: IAccountHistoryPoint[],
  getAccountCurrency: (accountId: number) => Currency,
  convertCurrency: (
    num: number,
    currency1: Currency,
    currency2: Currency,
  ) => number,
  curCurrency: Currency,
) => {
  return historyPoints.map(({ accountId, balance, ...historyPoint }) => {
    const accountCurrency = getAccountCurrency(accountId)
    return {
      ...historyPoint,
      balance,
      accountId,
      convertedBalance: RoundDecimal(
        convertCurrency(balance, accountCurrency, curCurrency),
        2,
      ),
    }
  })
}
