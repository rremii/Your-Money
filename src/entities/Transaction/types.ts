export interface ICategory {
  id: number
  name: string,
  color: string
  icon: string
  type: TransactionType
  userId: number
}

//todo add dtos
export interface GetTransactionDto {
  dateFrom: string
  dateTo: string
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
  userId: number
  title?: string
}


export type DateFilter = "day" | "week" | "month" | "year" | "allTime"

export interface CreateTransDto {
  accountId: number
  userId: number
  categoryId: number
  date: string
  quantity: number
  type: TransactionType
  title?: string
}