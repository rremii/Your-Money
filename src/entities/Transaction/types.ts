export interface ICategory {
  name: string,
  color: string
}


export type TransactionType = "income" | "expense"

export interface ITransaction {
  id: number
  category: string
  date: Date
  quantity: number
  type: TransactionType
}

export type DateFilter = "day" | "week" | "month" | "year" | "allTime"
