export interface ICategory {
  name: string,
  color: string
  icon: string
  type: string
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

export type DateFilter = "day" | "week" | "month" | "year" | "allTime"
