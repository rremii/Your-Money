export interface GetHistoryPointsDto {
  accountIds: number[]
  dateFrom: string
  dateTo: string
}

export interface GetHistoryPointsResponse {
  history: IAccountHistoryPoint[]
}

export interface IAccountHistoryPoint {
  id: number
  balance: number
  accountId: number
  date: string
  // account: {
  //   currency: Currency
  // }
}

export interface IConvertedHistoryPoint extends IAccountHistoryPoint {
  convertedBalance: number
}

// interface IHistoryPointWithCurrency extends IAccountHistoryPoint {
//   account: {
//     currency: Currency
//   }
// }

