import { ITransaction } from "@entities/Transaction/types.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { Currency } from "@entities/Currency/types.ts"

export const AddConvertedQuantityToTrans = (
  transactions: ITransaction[],
  getAccountCurrency: (accountId: number) => Currency,
  convertCurrency: (num: number, currency1: Currency, currency2: Currency) => number,
  curCurrency: Currency
) => {

  return transactions?.map(({ quantity, accountId, ...transaction }) => {
    const accountCurrency = getAccountCurrency(accountId)
    return {
      ...transaction,
      quantity, accountId,
      convertedQuantity: RoundDecimal(convertCurrency(quantity, accountCurrency, curCurrency), 2)
    }
  })

}