export interface GetHistoryPointsDto {
  userId: number
  dateFrom: string
  dateTo: string
}

export interface GetHistoryPointsResponse {
  history: IAccountHistoryPoint[]
  historyBorderRight: IAccountHistoryPoint | null
  historyBorderLeft: IAccountHistoryPoint[]
}

export interface IAccountHistoryPoint {
  id: number
  balance: number
  accountId: number
  date: string
}

