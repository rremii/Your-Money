export type TransactionType = "income" | "expense"
export interface ITransaction {
  id: number
  date: Date
  quantity: number
  type: TransactionType
  // accountBalance: number
  // categoryIcon: string
  // userId: number
  categoryId: number
  accountId: number
  title?: string
}
