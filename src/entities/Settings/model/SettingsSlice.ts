import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  curCurrency: Currency
  curCurrencySign: string
  language: string
}

const initialState: initialState = {
  curCurrency: Currency.DefaultCurrency,
  curCurrencySign:
    DefaultCurrencySigns.get(Currency.DefaultCurrency) ||
    Currency.DefaultCurrency,
  language: window.localStorage.getItem("language") || "en",
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
  },
})

export const SettingsReducer = SettingsSlice.reducer
export const { setCurCurrency, setCurCurrencySign, setLanguage } =
  SettingsSlice.actions
