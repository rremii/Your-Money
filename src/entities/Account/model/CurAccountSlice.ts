import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/types.ts"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  id: number | null
  name: string
  color: string
  balance: number
  icon: string
  currency: Currency
}

const initialState: initialState = {
  balance: 0,
  id: null,
  icon: "",
  color: "",
  name: "",
  currency: Currency.UnitedStatesDollar,
}

const CurAccountSlice = createSlice({
  name: "CurAccountSlice",
  initialState,
  reducers: {
    setCurAccount(state, action: PayloadAction<IAccount>) {
      const { name, color, icon, balance, currency, id } = action.payload
      state.id = id
      state.name = name
      state.balance = balance
      state.icon = icon
      state.color = color
      state.currency = currency
    },
    setCurAccountId(state, action: PayloadAction<number | null>) {
      state.id = action.payload
    },
    resetCurAccount(state) {
      return initialState
    },
  },
})

export const CurAccountReducer = CurAccountSlice.reducer
export const { setCurAccount, setCurAccountId, resetCurAccount } =
  CurAccountSlice.actions
