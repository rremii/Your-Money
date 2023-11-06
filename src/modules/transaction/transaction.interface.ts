import { Currency } from "../account/account.interface"

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
