import { ITransaction } from "@entities/Transaction/types.ts"

export const GetTransactionsMenuData = (transactions: ITransaction[]) => {

  //todo
  const allDates = new Set<string>()

  transactions.forEach(({ date }) => {
    allDates.add(new Date(date.getFullYear(), date.getMonth(), date.getDate()).toUTCString())
  })

  const transMenuData = [...allDates].map((strDate: string) => {
    const date = new Date(strDate)

    const dateFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dateTo = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    const sectionTransactions = transactions.filter(({ date }) => date >= dateFrom && date < dateTo)


    return {
      date,
      transactions: sectionTransactions
    }
  })

  return transMenuData

}