import { Currency } from "@entities/Account/types.ts"

export const CurrencySigns = {
  USD: ["$", "US$", "USD"],
  JPY: ["¥", "JPY"],
  GBP: ["£", "GBP"],
  RUB: ["₽", "р.", "RUB", "руб."],
  EUR: ["€", "EUR"],
  AUD: ["$", "A$", "AUD"],
  CAD: ["$", "C$", "CAD"],
  CNY: ["¥", "CNY"],
  CHF: ["Fr", "CHF", "SFr"],
  BYN: ["Br", "р.", "BYN", "руб."]
}


export const DefaultCurrencySigns = new Map<Currency, string>()

DefaultCurrencySigns.set(Currency.UnitedStatesDollar, "$")
DefaultCurrencySigns.set(Currency.JapaneseYen, "¥")
DefaultCurrencySigns.set(Currency.BritishPound, "£")
DefaultCurrencySigns.set(Currency.RussianRuble, "₽")
DefaultCurrencySigns.set(Currency.Euro, "€")
DefaultCurrencySigns.set(Currency.AustralianDollar, "$")
DefaultCurrencySigns.set(Currency.CanadianDollar, "$")
DefaultCurrencySigns.set(Currency.ChineseYuan, "¥")
DefaultCurrencySigns.set(Currency.SwissFranc, "Fr")
DefaultCurrencySigns.set(Currency.BelarusianRuble, "Br")
