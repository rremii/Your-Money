import { TransactionType } from "@entities/Transaction/types.ts"

export interface ICategory {
  id: number
  name: string,
  color: string
  icon: string
  type: TransactionType
  userId: number
}

export interface CreateCategoryDto {
  userId: number
  name: string,
  color: string
  icon: string
  type: TransactionType
}

export interface EditCategoryDto {
  id: number
  name: string,
  color: string
  icon: string
  type: TransactionType
}