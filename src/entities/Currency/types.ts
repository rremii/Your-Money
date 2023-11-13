interface IRate {
  [key: string]: number
}


export interface fetchCurrencyResponse {
  base: string
  date: string
  disclaimer: string
  https: string
  rates: IRate
  timestamp: number
}


export enum Currency {
  AustralianDollar = "AUD",
  BritishPound = "GBP",
  CanadianDollar = "CAD",
  ChineseYuan = "CNY",
  Euro = "EUR",
  JapaneseYen = "JPY",
  RussianRuble = "RUB",
  SwissFranc = "CHF",
  UnitedStatesDollar = "USD",
  BelarusianRuble = "BYN",
  DefaultCurrency = Currency.BelarusianRuble
}