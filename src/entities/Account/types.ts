interface AccountData {
  name: string
  color: string
  balance: number
  icon: string
  currency: Currency
}

export interface AccountResponse extends AccountData {
  id: number
}


export interface IAccount extends AccountData {
  id: number | null
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