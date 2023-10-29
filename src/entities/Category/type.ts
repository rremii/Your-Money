import { TransactionType } from "@entities/Transaction/types.ts"

export interface ICategory {
  id: number
  name: string,
  color: string
  icon: string
  type: TransactionType
  userId: number
}