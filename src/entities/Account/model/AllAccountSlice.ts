import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/types.ts"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  id: null
  name: string
  color: string
  balance: number
  icon: string
  currency: Currency
}

const initialState: initialState = {
  id: null,
  balance: 0,
  color: "#5C6AC0",
  name: "All accounts",
  icon: "card",
  currency: Currency.DefaultCurrency
}

const AllAccountSlice = createSlice({
  name: "AllAccountSlice",
  initialState,
  reducers: {
    setAllAccount(
      state,
      action: PayloadAction<
        Pick<IAccount, "name" | "balance" | "color" | "currency">
      >
    ) {
      const { name, color, balance, currency } = action.payload
      state.name = name
      state.balance = balance
      state.color = color
      state.currency = currency
    },
    setAllAccountBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
    },
    setAllAccountCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload
    }
  }
})

export const AllAccountReducer = AllAccountSlice.reducer
export const { setAllAccountBalance, setAllAccountCurrency } =
  AllAccountSlice.actions
