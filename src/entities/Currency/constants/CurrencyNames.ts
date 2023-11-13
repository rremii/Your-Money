import { Currency } from "@entities/Currency/types.ts"

export const CurrencyNames = new Map<Currency, string>()
CurrencyNames.set(Currency.Euro, "Euro")
CurrencyNames.set(Currency.UnitedStatesDollar, "United States Dollar")
CurrencyNames.set(Currency.SwissFranc, "Swiss Franc")
CurrencyNames.set(Currency.CanadianDollar, "Canadian Dollar")
CurrencyNames.set(Currency.BelarusianRuble, "Belarusian Ruble")
CurrencyNames.set(Currency.RussianRuble, "Russian Ruble")
CurrencyNames.set(Currency.BritishPound, "British Pound")
CurrencyNames.set(Currency.ChineseYuan, "Chinese Yuan")
CurrencyNames.set(Currency.JapaneseYen, "Japanese Yen")
CurrencyNames.set(Currency.DefaultCurrency, "Belarusian Ruble")
