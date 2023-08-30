import { ICategory } from "../category.interface"

export const defaultCategories: Array<Omit<ICategory, "id" | "userId">> = [
  {
    icon: "icon",
    name: "Gifts",
    color: "red",
  },
  {
    icon: "icon",
    name: "Family",
    color: "red",
  },
]
