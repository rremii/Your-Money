export interface GetTransactionDto {
  dateFrom: string
  dateTo: string
  accountIds: number[]
}


export type TransactionType = "income" | "expense"

export interface ITransaction {
  id: number
  date: string
  quantity: number
  type: TransactionType
  categoryId: number
  accountId: number
  title?: string
}


export type DateFilter = "day" | "week" | "month" | "year" | "allTime"


export interface CreateTransDto {
  accountId: number
  categoryId: number
  date: string
  quantity: number
  type: TransactionType
  title?: string
}

export interface EditTransDto {
  id: number
  accountId: number
  categoryId: number
  quantity: number
  type: TransactionType
  title?: string
  date: string
}

