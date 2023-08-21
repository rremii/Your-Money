import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount, IAccountHistoryPoint } from "@entities/Transaction/constants/Accounts.ts"
import { RootState } from "@shared/store/store.ts"

interface initialState {

  allAccounts: IAccount[]

  curAccName: string
  curAccBalance: number
  curAccHistory: IAccountHistoryPoint[]
}

const initialState: initialState = {
  allAccounts: [],
  curAccBalance: 0,
  curAccName: "",
  curAccHistory: []
}

const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  reducers: {
    setCurAccount(state, action: PayloadAction<{
      balance: number
      history?: IAccountHistoryPoint[]
    }>) {
      const { history, balance } = action.payload
      state.curAccBalance = balance
      state.curAccHistory = history || []
    },
    setAllAccounts(state, action: PayloadAction<IAccount[]>) {
      state.allAccounts = action.payload
    },
    changeAccount(state, action: PayloadAction<string>) {
      state.curAccName = action.payload
    }
  }
})

export const AccountReducer = AccountSlice.reducer
export const { setCurAccount, setAllAccounts, changeAccount } = AccountSlice.actions

export const getCurAccName = (state: RootState) => state.Account.curAccName
export const getCurAccBalance = (state: RootState) => state.Account.curAccBalance
export const getAllAccounts = (state: RootState) => state.Account.allAccounts
export const getCurAccHistory = (state: RootState) => state.Account.curAccHistory


export const getCurBalance = createSelector(
  getCurAccName,
  getCurAccBalance,
  getAllAccounts,
  (curName, curBalance, allAccounts) => {
    if (curName !== "All") return curBalance
    else return allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
  }
)
//todo wrong slice
export const getIsMenuIdZero = createSelector(
  (state: RootState) => state.Date.curMenuId,
  (menuId) => menuId === 0
)
