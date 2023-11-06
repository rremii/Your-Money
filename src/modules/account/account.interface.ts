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
}

export interface IAccount {
  id: number
  name: string
  color: string
  balance: number
  icon: string
  currency: Currency
}
