import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { RootState } from "@shared/store/store.ts"

interface initialState {
  id: number | null
  name: string
  color: string
  balance: number
  icon: string
}

const initialState: initialState = {
  balance: 0,
  id: null,
  icon: "",
  color: "",
  name: ""
}

const CurAccountSlice = createSlice({
  name: "CurAccountSlice",
  initialState,
  reducers: {
    setCurAccount(state, action: PayloadAction<IAccount>) {
      const { name, color, icon, balance } = action.payload
      state.name = name
      state.balance = balance
      state.icon = icon
      state.color = color
    },
    setCurAccountId(state, action: PayloadAction<number | null>) {
      state.id = action.payload
    }
  }
})

export const CurAccountReducer = CurAccountSlice.reducer
export const { setCurAccount, setCurAccountId } = CurAccountSlice.actions

// export const getAllAccounts = (state: RootState) => state.Account.allAccounts


// export const getCurBalance = createSelector(
//   getCurAccId,
//   getCurAccBalance,
//   getAllAccounts,
//   (curId, curBalance, allAccounts) => {
//     if (typeof curId === "number") return curBalance
//     else return allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
//   }
// )
//todo wrong slice
export const getIsMenuIdZero = createSelector(
  (state: RootState) => state.Date.curMenu.id,
  (menuId) => menuId === 0
)
