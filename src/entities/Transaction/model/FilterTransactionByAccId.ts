import { ITransaction } from "@entities/Transaction/types.ts"
import { number } from "yup"

export const FilterTransactionByAccId = (transactions: ITransaction[], curAccId: number | null) => {
  let allTransactions = transactions || []

  if (typeof curAccId === "number")
    allTransactions = transactions?.filter(({ accountId }) => accountId === curAccId) || []

  return allTransactions
}