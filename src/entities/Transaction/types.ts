export type TransCategories =
  "Health"
  | "Family"
  | "Gifts"
  | "Groceries"
  | "Leisure"
  | "Shopping"
  | "Restaurant"
  | "Transport"


export interface ICategory {
  name: TransCategories,
  color: string
}

export interface ITransaction {
  id: number
  category: TransCategories
  date: Date
  quantity: number

}