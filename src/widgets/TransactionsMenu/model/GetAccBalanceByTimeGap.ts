import { IAccount, IAccountHistoryPoint } from "@entities/Transaction/constants/Accounts.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"

interface props {
  allAccounts: IAccount[]
  curAccHistory: IAccountHistoryPoint[]
  dateFrom: Date
  dateTo: Date
}

const GetBalance = (history: IAccountHistoryPoint[], dateFrom: Date, dateTo: Date) => {

  const startBalance = history
    .filter(({ updateDate }) => new Date(updateDate) < dateFrom)
    .at(-1)?.balance

  const endBalance = history
    .filter(({ updateDate }) => IsDateBetween(dateFrom, new Date(updateDate), dateTo, "both"))
    [0]?.balance

  return { startBalance, endBalance: endBalance || startBalance }
}

export const GetAccBalanceByTimeGap = ({ curAccHistory, allAccounts, dateTo, dateFrom }: props) => {

  if (curAccHistory.length !== 0) {
    const { startBalance, endBalance } = GetBalance(curAccHistory, dateFrom, dateTo)
    return {
      startBalance: startBalance || 0,
      endBalance: endBalance || 0
    }
  } else {
    return allAccounts.map(({ history }) => {

      const { startBalance, endBalance } = GetBalance(history, dateFrom, dateTo)
      return {
        startBalance: startBalance || 0,
        endBalance: endBalance || 0
      }

    }).reduce((acc, cur) => {

      return {
        startBalance: acc.startBalance + cur.startBalance,
        endBalance: acc.endBalance + cur.endBalance
      }

    }, {
      startBalance: 0,
      endBalance: 0
    })

  }


}