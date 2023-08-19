import { ITransaction } from "@entities/Transaction/types.ts"

export const FilterTransByType = (transactions: ITransaction[]) => {

  const expTransactions: ITransaction[] = []
  const incTransactions: ITransaction[] = []

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") expTransactions.push(transaction)
    if (transaction.type === "income") incTransactions.push(transaction)
  })

  return {
    expTransactions, incTransactions
  }
}