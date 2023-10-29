import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/constants/Accounts.ts"

interface initialState {
  id: null
  name: string
  color: string
  balance: number
  icon: string
}

const initialState: initialState = {
  id: null,
  balance: 0,
  color: "#5C6AC0",
  name: "all",
  icon: ""
}

const AllAccountSlice = createSlice({
  name: "AllAccountSlice",
  initialState,
  reducers: {
    setAllAccount(state, action: PayloadAction<Pick<IAccount, "name" | "balance" | "color">>) {
      const { name, color, balance } = action.payload
      state.name = name
      state.balance = balance
      state.color = color
    },
    setAllAccountBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
    }
  }
})

export const AllAccountReducer = AllAccountSlice.reducer
export const { setAllAccountBalance } = AllAccountSlice.actions



