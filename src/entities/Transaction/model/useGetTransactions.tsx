import { ITransaction } from "@entities/Transaction/types.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactionsByDateGapQuery } from "@entities/Transaction/api/TransactionApi.ts"

export const useGetTransactions = (accountIds: number[]) => {

  const curAccId = useTypedSelector(state => state.CurAccount.id)
  const allTransDateGap = useTypedSelector(state => state.Date.allTransDateGap)


  const { data: transactions } = useGetTransactionsByDateGapQuery({
    ...allTransDateGap,
    accountIds
  }, {
    skip: !accountIds.length
  })

  let allTransactions = transactions || [] as ITransaction[]
  if (typeof curAccId === "number")
    allTransactions = transactions?.filter(({ accountId }) => accountId === curAccId) || []

  return {
    allTransactions
  }
}