import { ITransaction } from "@entities/Transaction/types.ts"
import { useMemo } from "react"

export const useGetTransactions = () => {


  const transactions: ITransaction[] = useMemo(() => [
    { category: "Family", date: new Date(2022, 1, 1), id: 1, quantity: 10 },
    { category: "Health", date: new Date(2023, 5, 1), id: 2, quantity: 12 },
    { category: "Transport", date: new Date(2023, 6, 29), id: 3, quantity: 51 },
    { category: "Leisure", date: new Date(2023, 6, 20, 10), id: 4, quantity: 11 },
    { category: "Gifts", date: new Date(2023, 7, 1, 10), id: 5, quantity: 101 },
    { category: "Family", date: new Date(2023, 7, 2, 10), id: 6, quantity: 5 },
    { category: "Restaurant", date: new Date(2023, 7, 2, 10), id: 7, quantity: 56 },
    { category: "Health", date: new Date(2023, 7, 6, 10), id: 8, quantity: 12 },
    { category: "Gifts", date: new Date(2023, 7, 6, 10), id: 9, quantity: 31 },
    { category: "Groceries", date: new Date(2023, 7, 7, 10), id: 10, quantity: 51 },
    { category: "Health", date: new Date(2023, 7, 7, 10), id: 11, quantity: 5 },
    { category: "Groceries", date: new Date(2023, 7, 8, 10), id: 12, quantity: 12 },
    { category: "Shopping", date: new Date(2023, 7, 8, 10), id: 13, quantity: 31 }
  ], [])
  return { transactions }
}