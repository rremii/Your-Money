import { EntityManager } from "typeorm"

export type TransactionType = "income" | "expense"

export interface TransactionInterface {
  manager: EntityManager
}

export interface ITransaction {
  id: number
  date: string
  quantity: number
  type: TransactionType

  categoryId: number
  accountId: number
  title?: string
}
