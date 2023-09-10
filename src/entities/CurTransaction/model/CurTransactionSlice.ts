import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { RootState } from "@shared/store/store.ts"
import { ITransaction, TransactionType } from "@entities/Transaction/types.ts"
import { isObject } from "chart.js/helpers"

type IEditMenuType = "overview" | "edit"

interface initialState {
  isEditMenu: boolean
  editMenuType: IEditMenuType

  id: number | null
  dateStr: string
  quantity: number
  type: TransactionType
  categoryId: number | null
  accountId: number | null
  title?: string
  account: {
    name: string
    icon: string
    color: string
  }
  category: {
    icon: string
    name: string
    color: string
  }
}

const initialState: initialState = {
  isEditMenu: false,
  editMenuType: "overview",

  id: null,
  dateStr: new Date().toUTCString(),
  quantity: 0,
  title: "",
  type: "expense",
  categoryId: null,
  accountId: null,
  account: {
    name: "",
    icon: "",
    color: ""
  },
  category: {
    name: "",
    icon: "",
    color: ""
  }
}

const CurTransactionSlice = createSlice({
  name: "CurTransactionSlice",
  initialState,
  reducers: {
    setEditMenu(state, action: PayloadAction<{ isOpen: boolean, menuType: IEditMenuType }>) {
      state.isEditMenu = action.payload.isOpen
      state.editMenuType = action.payload.menuType
    },
    clearCurTransaction(state) {
      state.id = null
    },
    setCurTransaction(state, action: PayloadAction<ITransaction>) {
      state.id = action.payload.id
      state.title = action.payload.title
      state.type = action.payload.type
      state.account = action.payload.account
      state.category = action.payload.category
      state.quantity = action.payload.quantity
      state.accountId = action.payload.accountId
      state.categoryId = action.payload.categoryId
      state.dateStr = action.payload.date
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setAccount(state, action: PayloadAction<{
      accountId: number | null
      account: {
        name: string
        icon: string
        color: string
      }
    }>) {
      state.accountId = action.payload.accountId
      state.account = action.payload.account
    },
    setCategory(state, action: PayloadAction<{
      categoryId: number | null
      category: {
        icon: string
        name: string
        color: string
      }
    }>) {
      state.categoryId = action.payload.categoryId
      state.category = action.payload.category
    },
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload
    },
    setType(state, action: PayloadAction<TransactionType>) {
      state.type = action.payload
    },
    setDateStr(state, action: PayloadAction<string>) {
      state.dateStr = action.payload
    }
  }
})

export const CurTransactionReducer = CurTransactionSlice.reducer
export const {
  setCurTransaction,
  setEditMenu,
  setAccount,
  setQuantity,
  setDateStr,
  setType,
  setTitle,
  setCategory,
  clearCurTransaction
} = CurTransactionSlice.actions
