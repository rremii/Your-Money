export type TransCategories = "Health" | "Family" | "Gifts"


export interface ITransaction {
  id: number
  category: TransCategories
  date: Date
  quantity: number

}

export const useGetTransactions = () => {


  const transactions: ITransaction[] = [
    { category: "Family", date: new Date(2022, 1, 1), id: 1, quantity: 10 },
    { category: "Health", date: new Date(2023, 5, 1), id: 2, quantity: 12 },
    { category: "Health", date: new Date(2023, 6, 29), id: 3, quantity: 51 },
    { category: "Gifts", date: new Date(2023, 6, 20, 10), id: 4, quantity: 11 },
    { category: "Gifts", date: new Date(2023, 7, 1, 10), id: 4, quantity: 101 },
    { category: "Family", date: new Date(2023, 7, 2, 10), id: 5, quantity: 5 }
  ]
  return { transactions }
}