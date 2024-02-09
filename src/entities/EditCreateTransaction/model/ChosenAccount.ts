import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  id: number | null
  name: string
  icon: string
  color: string
  balance: number
  currency: Currency
}

const initialState: initialState = {
  id: null,
  balance: 0,
  color: "",
  icon: "",
  name: "",
  currency: Currency.DefaultCurrency
}

const ChosenAccount = createSlice({
  name: "ChosenAccount",
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<initialState>) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.balance = action.payload.balance
      state.color = action.payload.color
      state.icon = action.payload.icon
      state.currency = action.payload.currency
    },
    resetChosenAccount(state) {
      state.id = null
      state.name = ""
      state.balance = 0
      state.color = ""
      state.icon = ""
    }

  }
})

export const ChosenAccountReducer = ChosenAccount.reducer
export const { resetChosenAccount, setAccount } = ChosenAccount.actions