import { ITransByMenu } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { GetHistoryPointsResponse, IAccountHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"

interface HistoryData extends GetHistoryPointsResponse {
}

export interface MenuWithHistory extends ITransByMenu {
  startBalance: number
  endBalance: number
}


//todo check if i need order right
export const AddHistoryPointsToMenus = (menus: ITransByMenu[], {
  history,
  historyBorderRight,
  historyBorderLeft
}: HistoryData): MenuWithHistory[] => {

  const GetPrevPoint = (menuDate: Date): number => {

    let historyPoint: IAccountHistoryPoint | undefined
    for (let i = history.length; i > 0; i--) {
      if (new Date(history[i - 1].date) <= menuDate) {
        historyPoint = history[i - 1]
        break
      }
    }
    return historyPoint?.balance || historyBorderLeft?.balance || 0
  }


  return menus.map(({ dateFrom, dateTo, ...menuData }) => {

    const startBalance = GetPrevPoint(dateFrom)
    const endBalance = GetPrevPoint(dateTo)


    return {
      ...menuData, dateFrom, dateTo,
      startBalance,
      endBalance
    }
  })


}