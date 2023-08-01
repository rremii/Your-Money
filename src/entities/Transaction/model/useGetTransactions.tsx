type Transcategories = "Health" | "Family" | "Gifts"


interface ITransaction {
  id: number
  category: Transcategories
  date: Date
  quantity: number

}

export const useGetTransactions = () => {


  const transactions: ITransaction[] = [
    { category: "Family", date: new Date(), id: 1, quantity: 10 },
    { category: "Health", date: new Date(), id: 2, quantity: 12 },
    { category: "Health", date: new Date(), id: 3, quantity: 51 },
    { category: "Gifts", date: new Date(), id: 4, quantity: 11 },
    { category: "Family", date: new Date(), id: 5, quantity: 5 }
  ]
  return { transactions }
}