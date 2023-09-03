export type CategoryType = "income" | "expense"
export interface ICategory {
  id: number
  name: string
  color: string
  icon: string
  type: CategoryType
  userId: number
}
