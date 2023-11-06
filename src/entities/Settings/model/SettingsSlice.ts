import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Currency } from "@entities/Account/types.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"

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
  reducers: {}
})

export const SettingsReducer = SettingsSlice.reducer
export const {} = SettingsSlice.actions