interface IRate {
  [key: string]: number
}


interface fetchCurrencyResponse {
  base: string
  date: string
  disclaimer: string
  https: string
  rates: IRate
  timestamp: number

}