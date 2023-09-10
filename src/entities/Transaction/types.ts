export interface ICategory {
  id: number
  name: string,
  color: string
  icon: string
  type: string
  userId: number
}

//todo add dtos
export interface CreateTransactionDto {
  dateFrom: string
  dateTo: string
  accountId: number
  userId?: number
}


export type TransactionType = "income" | "expense"

export interface ITransaction {
  id: number
  date: string
  quantity: number
  type: TransactionType
  accountBalance: number
  categoryId: number
  accountId: number
  title?: string
  account: {
    name: string
    icon: string
    color: string
  }
  category: {
    icon: string
    name: string
    color: string
  }
}


export type DateFilter = "day" | "week" | "month" | "year" | "allTime"
