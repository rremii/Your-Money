import { IConvertedTransaction, ITransaction } from "@entities/Transaction/types.ts"

export const FilterTransByType = (transactions: IConvertedTransaction[]) => {

  const expTransactions: IConvertedTransaction[] = []
  const incTransactions: IConvertedTransaction[] = []

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") expTransactions.push(transaction)
    if (transaction.type === "income") incTransactions.push(transaction)
  })

  return {
    expTransactions, incTransactions
  }
}