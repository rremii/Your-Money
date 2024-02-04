import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICategory } from "@entities/Category/type.ts"
import { IAccount } from "@entities/Account/types.ts"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  id: number | null
  name: string
  color: string
  icon: string
  currency: Currency
  balance: number
}

const initialState: initialState = {
  id: null,
  name: "",
  color: "",
  icon: "",
  currency: Currency.DefaultCurrency,
  balance: 0
}

const NewAccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  reducers: {
    setCreateAccount(state, action: PayloadAction<Omit<IAccount, "id">>) {
      const { color, name, icon, currency, balance } = action.payload
      state.color = color
      state.name = name
      state.icon = icon
      state.currency = currency
      state.balance = balance
    },
    setEditAccount(state, action: PayloadAction<IAccount>) {
      const { color, name, icon, id, currency, balance } = action.payload
      state.id = id
      state.color = color
      state.currency = currency
      state.name = name
      state.icon = icon
      state.balance = balance
    },
    setNewAccountName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setNewAccountIcon(state, action: PayloadAction<string>) {
      state.icon = action.payload
    },
    setNewAccountColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
    setNewAccountCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload
    },
    resetEditAccount(state) {
      state.id = null
      state.color = ""
      state.name = ""
      state.icon = ""
      state.currency = Currency.DefaultCurrency
      state.balance = 0
    }


  }
})

export const NewAccountReducer = NewAccountSlice.reducer
export const {
  setNewAccountIcon,
  setNewAccountColor,
  setNewAccountName,
  setEditAccount,
  resetEditAccount,
  setCreateAccount, setNewAccountCurrency
} = NewAccountSlice.actions
