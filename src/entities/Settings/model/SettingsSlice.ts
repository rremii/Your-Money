import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { Currency } from "@entities/Currency/types.ts"
import { DayType } from "@shared/constants/Days.ts"
import { startScreenType, themeType } from "@entities/Settings/types.ts"

interface initialState {
  curCurrency: Currency
  curCurrencySign: string
  language: string
  theme: themeType
  currencyFormat: string
  firstDay: DayType
  startScreen: startScreenType
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
  firstDay: (window.localStorage.getItem("firstDayWeek") as DayType) || "Sun",
  startScreen:
    (window.localStorage.getItem("startScreen") as startScreenType) ||
    "Transactions",
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
    setWeekDay(state, action: PayloadAction<DayType>) {
      state.firstDay = action.payload
    },
    setStartScreen(state, action: PayloadAction<startScreenType>) {
      state.startScreen = action.payload
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
  setWeekDay,
  setStartScreen,
} = SettingsSlice.actions
