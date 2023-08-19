import { ITransaction } from "@entities/Transaction/types.ts"
import { useMemo } from "react"

export const useGetTransactions = () => {


  const transactions: ITransaction[] = useMemo(() => [
    { category: "Family", date: new Date(2022, 11, 31), id: 1, quantity: 10, type: "expense" },
    { category: "Salary", date: new Date(2023, 0, 1), id: 2, quantity: 50, type: "income" },
    { category: "Health", date: new Date(2023, 5, 0, 1), id: 3, quantity: 12, type: "expense" },
    { category: "Salary", date: new Date(2023, 6, 29, 10), id: 4, quantity: 51, type: "income" },
    { category: "Leisure", date: new Date(2023, 6, 20, 10), id: 5, quantity: 11, type: "expense" },
    { category: "Gifts", date: new Date(2023, 7, 1, 10), id: 6, quantity: 101, type: "expense" },
    { category: "Family", date: new Date(2023, 7, 2, 10), id: 7, quantity: 5, type: "expense" },
    { category: "Restaurant", date: new Date(2023, 7, 2, 10), id: 8, quantity: 56, type: "expense" },
    { category: "Salary", date: new Date(2023, 7, 6, 10), id: 9, quantity: 12, type: "income" },
    { category: "Gifts", date: new Date(2023, 7, 6, 10), id: 10, quantity: 31, type: "expense" },
    { category: "Groceries", date: new Date(2023, 7, 7, 10), id: 11, quantity: 51, type: "expense" },
    { category: "Salary", date: new Date(2023, 7, 7, 10), id: 12, quantity: 5, type: "income" },
    { category: "Groceries", date: new Date(2023, 7, 8, 10), id: 13, quantity: 12, type: "expense" },
    { category: "Shopping", date: new Date(2023, 7, 8, 10), id: 14, quantity: 31, type: "expense" },
    { category: "Salary", date: new Date(2023, 7, 8, 11), id: 15, quantity: 60, type: "income" },
    { category: "Salary", date: new Date(2023, 7, 31, 0), id: 16, quantity: 60, type: "income" },
    { category: "Restaurant", date: new Date(2023, 8, 1, 0), id: 17, quantity: 60, type: "expense" }
  ], [])
  return { allTransactions: transactions }
}