import { Currency } from "@entities/Currency/types.ts"

interface ICurrencyCell {
  fullName: string
  shortName: Currency
}

export const MainCurrencies: ICurrencyCell[] = [
  { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
  { fullName: "British pound", shortName: Currency.BritishPound },
  { fullName: "Canadian dollar", shortName: Currency.CanadianDollar },
  { fullName: "Chinese yuan", shortName: Currency.ChineseYuan },
  { fullName: "Euro", shortName: Currency.Euro },
  { fullName: "Japanese yen", shortName: Currency.JapaneseYen },
  { fullName: "Russian ruble", shortName: Currency.RussianRuble },
  { fullName: "Swiss franc", shortName: Currency.SwissFranc },
  { fullName: "UnitedStates dollar", shortName: Currency.UnitedStatesDollar },
  { fullName: "Belarusian ruble", shortName: Currency.BelarusianRuble }
]