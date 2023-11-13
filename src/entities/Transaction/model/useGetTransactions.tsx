import { IConvertedTransaction, ITransaction } from "@entities/Transaction/types.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactionsByDateGapQuery } from "@entities/Transaction/api/TransactionApi.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { IAccount } from "@entities/Account/types.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { number } from "yup"
import { AddConvertedQuantityToTrans } from "@entities/Transaction/model/AddConvertedQuantityToTrans.ts"
import { FilterTransactionByAccId } from "@entities/Transaction/model/FilterTransactionByAccId.ts"
import { Currency } from "@entities/Currency/types.ts"


export const useGetTransactions = (
  accountIds: number[],
  getAccountById: (id: number | null) => IAccount | null
): { allTransactions: IConvertedTransaction[] } => {

  const curAccId = useTypedSelector(state => state.CurAccount.id)
  const allTransDateGap = useTypedSelector(state => state.Date.allTransDateGap)
  const curCurrency = useTypedSelector(state => state.Settings.curCurrency)


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