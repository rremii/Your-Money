import { ITransaction } from "@entities/Transaction/types.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactionsByDateGapQuery } from "@entities/Transaction/api/TransactionApi.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"

export const useGetTransactions = (userId?: number) => {

  const curAccId = useTypedSelector(state => state.Account.curAccId)
  const allTransDateGap = useTypedSelector(state => state.Date.allTransDateGap)

  const { data: user } = GetMe.useQueryState()

  const { data: transactions } = useGetTransactionsByDateGapQuery({
    ...allTransDateGap,
    accountId: curAccId || 0,
    userId: user?.id
  }, {
    skip: !curAccId || !user?.id
  })

  let allTransactions = transactions || [] as ITransaction[]
  if (typeof curAccId !== "number")
    allTransactions = transactions?.filter(({ accountId }) => accountId === curAccId) || []

  return {
    allTransactions
  }
}