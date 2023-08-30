export interface IAccount {
  id: number
  name: string
  color: string
  balance: number
  icon: string
}

export type TransactionType = "income" | "expense"
export interface ITransaction {
  id: number
  category: string
  date: Date
  quantity: number
  type: TransactionType
  accountBalance: number
  accountId: number
  title?: string
}
