import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  curCurrency: Currency,
  curCurrencySign: string
}

const initialState: initialState = {
  curCurrency: Currency.DefaultCurrency,
  curCurrencySign: DefaultCurrencySigns.get(Currency.DefaultCurrency) || Currency.DefaultCurrency
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
    }
  }
})

export const SettingsReducer = SettingsSlice.reducer
export const { setCurCurrency, setCurCurrencySign } = SettingsSlice.actions