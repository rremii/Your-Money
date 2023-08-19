export interface ICategory {
  name: string,
  color: string
}

export interface ITransaction {
  id: number
  category: string
  date: Date
  quantity: number
  type: "income" | "expense"
}

export type DateFilter = "day" | "week" | "month" | "year" | "allTime"
