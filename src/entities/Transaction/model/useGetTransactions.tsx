import { IConvertedTransaction } from "@entities/Transaction/types.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactionsByDateGapQuery } from "@entities/Transaction/api/TransactionApi.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { IAccount } from "@entities/Account/types.ts"
import { AddConvertedQuantityToTrans } from "@entities/Transaction/model/AddConvertedQuantityToTrans.ts"
import { FilterTransactionByAccId } from "@entities/Transaction/model/FilterTransactionByAccId.ts"
import { Currency } from "@entities/Currency/types.ts"

export const useGetTransactions = (
  accountIds: number[],
  getAccountById: (id: number | null) => IAccount | null,
): { allTransactions: IConvertedTransaction[] } => {
  const curAccId = useTypedSelector((state) => state.CurAccount.id)
  const dateTo = useTypedSelector((state) => state.Date.allTransDateGap.dateTo)
  const dateFrom = useTypedSelector(
    (state) => state.Date.allTransDateGap.dateFrom,
  )

  const curCurrency = useTypedSelector((state) => state.Settings.curCurrency)

  const { data: transactions } = useGetTransactionsByDateGapQuery(
    {
      dateTo,
      dateFrom,
      accountIds,
    },
    {
      skip: !accountIds.length,
    },
  )

  const { convertCurrency } = useCurrencyConverter()
  const getAccountCurrency = (accountId: number) => {
    return getAccountById(accountId)?.currency || Currency.DefaultCurrency
  }

  const transactionsWithConvertedQuantity = AddConvertedQuantityToTrans(
    transactions || [],
    getAccountCurrency,
    convertCurrency,
    curCurrency,
  )
  const allTransactions = FilterTransactionByAccId(
    transactionsWithConvertedQuantity,
    curAccId,
  ) as IConvertedTransaction[]

  return {
    allTransactions,
  }
}
