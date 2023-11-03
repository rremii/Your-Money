import { ITransByMenu } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { IAccountHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"

// type HistoryData = GetHistoryPointsResponse

export interface MenuWithHistory extends ITransByMenu {
  startBalance: number
  endBalance: number
}


export const AddHistoryPointsToMenus = (menus: ITransByMenu[],
                                        history: IAccountHistoryPoint[], curAccountId: number | null): MenuWithHistory[] => {


  const GetAllAccountPrevPoint = (menuDate: Date, initHistoryPoints: IAccountHistoryPoint[]): number => {

    const accountsIdsHistoryPoints = new Set()

    const historyPoints = []

    for (let i = initHistoryPoints.length; i > 0; i--) {
      const curHistoryPoint = initHistoryPoints[i - 1]
      if (new Date(curHistoryPoint.date) < menuDate && !accountsIdsHistoryPoints.has(curHistoryPoint.accountId)) {
        historyPoints.push(curHistoryPoint)
        accountsIdsHistoryPoints.add(curHistoryPoint.accountId)
      }
    }

    return historyPoints.reduce((acc, prev) => acc + prev.balance, 0) || 0
  }

  const GetAccountPrevPoint = (menuDate: Date, initHistoryPoints: IAccountHistoryPoint[]): number => {

    let historyPointBalance = 0

    for (let i = initHistoryPoints.length; i > 0; i--) {
      const curHistoryPoint = initHistoryPoints[i - 1]
      if (new Date(curHistoryPoint.date) < menuDate) {
        historyPointBalance = curHistoryPoint.balance
        break
      }
    }

    return historyPointBalance
  }


  return menus.map(({ dateFrom, dateTo, ...menuData }) => {


    let endBalance = null
    let startBalance = null

    if (!curAccountId) {
      endBalance = GetAllAccountPrevPoint(dateTo, history)
      startBalance = GetAllAccountPrevPoint(dateFrom, history)
    } else {
      endBalance = GetAccountPrevPoint(dateTo, history)
      startBalance = GetAccountPrevPoint(dateFrom, history)
    }

    return {
      ...menuData, dateFrom, dateTo,
      startBalance,
      endBalance: endBalance
    }
  })


}