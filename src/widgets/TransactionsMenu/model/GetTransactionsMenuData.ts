import { ITransaction } from "@entities/Transaction/types.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"

export const GetTransactionsMenuData = (transactions: ITransaction[]) => {

  //todo
  const allDates = new Set<string>()

  transactions.forEach(({ date }) => {
    const initData = new Date(date)
    allDates.add(new Date(initData.getFullYear(), initData.getMonth(), initData.getDate()).toUTCString())
  })

  const transMenuData = [...allDates].map((strDate: string) => {
    const date = new Date(strDate)

    const dateFrom = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dateTo = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    const sectionTransactions = transactions.filter(({ date }) => IsDateBetween(dateFrom, new Date(date), dateTo, "left"))


    return {
      date,
      transactions: sectionTransactions
    }
  })

  return transMenuData

}