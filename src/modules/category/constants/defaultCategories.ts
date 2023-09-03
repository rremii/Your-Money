import { ICategory } from "../category.interface"

export const defaultCategories: Array<Omit<ICategory, "id" | "userId">> = [
  { name: "Family", icon: "family", color: "#A930FF", type: "expense" },
  { name: "Gifts", icon: "gifts", color: "#CF3648", type: "expense" },
  { name: "Groceries", icon: "groceries", color: "#32CFFF", type: "expense" },
  { name: "Health", icon: "health", color: "#46A33D", type: "expense" },
  { name: "Leisure", icon: "leisure", color: "#A33D6E", type: "expense" },
  { name: "Shopping", icon: "shopping", color: "#7B7475", type: "expense" },
  { name: "Restaurant", icon: "restaurant", color: "#316CFF", type: "expense" },
  { name: "Transport", icon: "transport", color: "#AF8A6D", type: "expense" },

  { name: "Salary", icon: "salary", color: "red", type: "income" },
]
