//todo move it to some where else

import { Currency } from "@entities/Account/types.ts"

export const CurrencySigns = {
  USD: ["$", "US$", "USD"]
  // USD: ["$", "US$", "USD"],
  // USD: ["$", "US$", "USD"],
  // USD: ["$", "US$", "USD"],
  // USD: ["$", "US$", "USD"],
  // USD: ["$", "US$", "USD"],
  // USD: ["$", "US$", "USD"],
}


export const DefaultCurrencySigns = new Map()

DefaultCurrencySigns.set(Currency.UnitedStatesDollar, "$")
// CurrencySigns.set(Currency.JapaneseYen,"$")
// CurrencySigns.set(Currency.BritishPound,"$")
// CurrencySigns.set(Currency.RussianRuble,"$")
// CurrencySigns.set(Currency.Euro,"$")
// CurrencySigns.set(Currency.AustralianDollar,"$")
// CurrencySigns.set(Currency.CanadianDollar,"$")
// CurrencySigns.set(Currency.ChineseYuan,"$")
// CurrencySigns.set(Currency.SwissFranc,"$")
// CurrencySigns.set(Currency.BelarusianRuble,"$")
