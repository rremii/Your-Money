import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { Currency } from "@entities/Currency/types.ts"

export type themeType = "light" | "dark"

interface initialState {
  curCurrency: Currency
  curCurrencySign: string
  language: string
  theme: themeType
  currencyFormat: string
}

const initialState: initialState = {
  curCurrency: Currency.DefaultCurrency,
  curCurrencySign:
    DefaultCurrencySigns.get(Currency.DefaultCurrency) ||
    Currency.DefaultCurrency,
  language: window.localStorage.getItem("language") || "en",
  theme: (window.localStorage.getItem("theme") as themeType) || "light",
  currencyFormat:
    window.localStorage.getItem("currencyFormat") ||
    "{currency} {sign}{quantity_coma}",
}

const SettingsSlice = createSlice({
  name: "SettingsSlice",
  initialState,
  reducers: {
    setCurCurrency(state, action: PayloadAction<Currency>) {
      state.curCurrency = action.payload
    },
    setCurCurrencySign(state, action: PayloadAction<string>) {
      state.curCurrencySign = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
    },
    setTheme(state, action: PayloadAction<themeType>) {
      state.theme = action.payload
    },
    setCurrencyFormat(state, action: PayloadAction<string>) {
      state.currencyFormat = action.payload
    },
  },
})

export const SettingsReducer = SettingsSlice.reducer
export const {
  setCurCurrency,
  setCurCurrencySign,
  setLanguage,
  setTheme,
  setCurrencyFormat,
} = SettingsSlice.actions
