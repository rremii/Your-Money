import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Transaction/constants/Accounts.ts"
import { RootState } from "@shared/store/store.ts"

interface initialState {

  allAccounts: IAccount[]
  curAccBalance: number
  curAccId: number | null
}

const initialState: initialState = {
  allAccounts: [],
  curAccBalance: 0,
  curAccId: null
}

const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  reducers: {
    setCurAccount(state, action: PayloadAction<IAccount>) {
      state.curAccBalance = action.payload.balance
    },
    setAllAccounts(state, action: PayloadAction<IAccount[]>) {
      state.allAccounts = action.payload
    },
    changeAccountId(state, action: PayloadAction<number | null>) {
      state.curAccId = action.payload
    }
  }
})

export const AccountReducer = AccountSlice.reducer
export const { setCurAccount, setAllAccounts, changeAccountId } = AccountSlice.actions

export const getCurAccId = (state: RootState) => state.Account.curAccId
export const getCurAccBalance = (state: RootState) => state.Account.curAccBalance
export const getAllAccounts = (state: RootState) => state.Account.allAccounts


export const getCurBalance = createSelector(
  getCurAccId,
  getCurAccBalance,
  getAllAccounts,
  (curId, curBalance, allAccounts) => {
    if (typeof curId === "number") return curBalance
    else return allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
  }
)
//todo wrong slice
export const getIsMenuIdZero = createSelector(
  (state: RootState) => state.Date.curMenuId,
  (menuId) => menuId === 0
)
