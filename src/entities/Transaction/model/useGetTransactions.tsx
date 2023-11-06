import { IConvertedTransaction, ITransaction } from "@entities/Transaction/types.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactionsByDateGapQuery } from "@entities/Transaction/api/TransactionApi.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { Currency, IAccount } from "@entities/Account/types.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { number } from "yup"


const FilterTransactionByAccId = (transactions: ITransaction[], curAccId: number | null) => {
  let allTransactions = transactions || []

  if (typeof curAccId === "number")
    allTransactions = transactions?.filter(({ accountId }) => accountId === curAccId) || []

  return allTransactions
}
const AddConvertedQuantityToTrans = (
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


export const useGetTransactions = (
  accountIds: number[],
  getAccountById: (id: number | null) => IAccount | null
): { allTransactions: IConvertedTransaction[] } => {

  const curAccId = useTypedSelector(state => state.CurAccount.id)
  const allTransDateGap = useTypedSelector(state => state.Date.allTransDateGap)
  const curCurrency = useTypedSelector(state => state.SideBar.curCurrency)


  const { data: transactions } = useGetTransactionsByDateGapQuery({
    ...allTransDateGap,
    accountIds
  }, {
    skip: !accountIds.length
  })

  const { convertCurrency } = useCurrencyConverter()
  const getAccountCurrency = (accountId: number) => {
    return getAccountById(accountId)?.currency || Currency.DefaultCurrency
  }


  const transactionsWithConvertedQuantity = AddConvertedQuantityToTrans(transactions || [], getAccountCurrency, convertCurrency, curCurrency)
  const allTransactions = FilterTransactionByAccId(transactionsWithConvertedQuantity, curAccId) as IConvertedTransaction[]

  return {
    allTransactions
  }
}