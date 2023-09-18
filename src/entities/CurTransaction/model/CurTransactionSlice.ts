import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { RootState } from "@shared/store/store.ts"
import { ITransaction, TransactionType } from "@entities/Transaction/types.ts"
import { isObject } from "chart.js/helpers"

type IEditMenuType = "overview" | "edit" | "create"


interface IEditTrans {
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

export type MathOperatorType = "mul" | "sub" | "div" | "sum" | null


export const MathOperatorSign = new Map()
MathOperatorSign.set("div", "÷")
MathOperatorSign.set("sub", "-")
MathOperatorSign.set("sum", "+")
MathOperatorSign.set("mul", "×")

interface initialState extends IEditTrans {
  operator: MathOperatorType
  numberStr1: string
  numberStr2: string

  isEditMenu: boolean
  editMenuType: IEditMenuType

  isChooseAccountMenu: boolean
  isChooseCategoryMenu: boolean
  isChangeTitleMenu: boolean

}

const initialState: initialState = {
  numberStr1: "",
  numberStr2: "",
  operator: null,

  isEditMenu: false,
  editMenuType: "overview",

  isChooseCategoryMenu: false,
  isChooseAccountMenu: false,
  isChangeTitleMenu: false,

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
    addToNum(state, action: PayloadAction<number>) {
      const operator = state.operator
      const num1 = state.numberStr1
      const num2 = state.numberStr2

      if (!operator) {
        const joinedNum = num1 + String(action.payload)
        state.numberStr1 = joinedNum
      } else {
        const joinedNum = num2 + String(action.payload)
        state.numberStr2 = joinedNum
      }

    },
    setOperator(state, action: PayloadAction<MathOperatorType>) {
      state.operator = action.payload
    },
    setChooseCategoryMenu(state, action: PayloadAction<boolean>) {
      state.isChooseCategoryMenu = action.payload
    },
    setChangeTitleMenu(state, action: PayloadAction<boolean>) {
      state.isChangeTitleMenu = action.payload
    },
    setChooseAccountMenu(state, action: PayloadAction<boolean>) {
      state.isChooseAccountMenu = action.payload
    },
    setEditMenu(state, action: PayloadAction<{ isOpen: boolean, menuType: IEditMenuType }>) {
      state.isEditMenu = action.payload.isOpen
      state.editMenuType = action.payload.menuType
    },
    setMenuType(state, action: PayloadAction<IEditMenuType>) {
      state.editMenuType = action.payload
    },

    setCurTransaction(state, action: PayloadAction<IEditTrans>) {
      state.id = action.payload.id
      state.title = action.payload.title
      state.type = action.payload.type
      state.account = action.payload.account
      state.category = action.payload.category
      state.quantity = action.payload.quantity
      state.accountId = action.payload.accountId
      state.categoryId = action.payload.categoryId
      state.dateStr = action.payload.dateStr
    },
    resetCurTransaction(state) {
      state.id = null
      state.title = ""
      state.type = "expense"
      state.account = { name: "", color: "", icon: "" }
      state.category = { name: "", color: "", icon: "" }
      state.quantity = 0
      state.accountId = null
      state.categoryId = null
      state.dateStr = new Date().toUTCString()
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
  setQuantity, setChangeTitleMenu,
  setDateStr,
  setType,
  setTitle,
  setCategory,
  resetCurTransaction,
  setMenuType,
  setChooseCategoryMenu,
  setChooseAccountMenu, addToNum, setOperator
} = CurTransactionSlice.actions
