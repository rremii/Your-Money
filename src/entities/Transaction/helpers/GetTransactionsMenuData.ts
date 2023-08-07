import { ITransaction } from "@entities/Transaction/model/useGetTransactions.tsx"
import { GetTransByDate } from "@entities/Transaction/helpers/GetTransByDate.ts"

export const GetTransactionsMenuData = (transactions: ITransaction[]) => {

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