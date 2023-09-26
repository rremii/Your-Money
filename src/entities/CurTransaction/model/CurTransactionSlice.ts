import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "@entities/Transaction/types.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

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
    color: string,
    balance: number
  }
  category: {
    icon: string
    name: string
    color: string
  }
}

export type MathOperatorType = "mul" | "sub" | "div" | "sum" | null


export const CalcMathOperation = (arg: number[], operator: MathOperatorType) => {

  switch (operator) {
    case "mul":
      return RoundDecimal(arg.reduce((acc, cur) => acc * cur, 1))
    case "div":
      return RoundDecimal(arg.reduce((acc, cur) => acc / cur))
    case "sub":
      return RoundDecimal(arg.reduce((acc, cur) => acc - cur))
    case "sum":
      return RoundDecimal(arg.reduce((acc, cur) => acc + cur, 0))
    default:
      return arg[0]
  }

}

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
  isChooseCategorySlideMenu: boolean
  isChangeTitleMenu: boolean
  isChangeDateMenu: boolean

}

const initialState: initialState = {
  numberStr1: "0",
  numberStr2: "",
  operator: null,

  isEditMenu: false,
  editMenuType: "overview",

  isChooseCategorySlideMenu: false,
  isChooseCategoryMenu: false,
  isChooseAccountMenu: false,
  isChangeTitleMenu: false,
  isChangeDateMenu: false,

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
    color: "",
    balance: 0
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
    removeLastNumber(state) {
      const operator = state.operator
      const quantityStr = String(state.quantity)
      const num1 = state.numberStr1
      const num2 = state.numberStr2

      if (num2)
        state.numberStr2 = num2.slice(0, -1)
      else if (operator)
        state.operator = null
      else if (num1)
        state.numberStr1 = num1.slice(0, -1)
      else if (quantityStr)
        state.quantity = +quantityStr.slice(0, -1)
      else state.quantity = 0
    },
    addToNum(state, action: PayloadAction<number | string>) {

      const operator = state.operator
      const num1 = state.numberStr1
      const num2 = state.numberStr2

      if (action.payload === ".") {
        if (!operator) {
          if (num1.includes(".") || !num1) return
        } else {
          if (num2.includes(".") || !num2) return
        }
      }
      if (!operator) {
        const joinedNum = num1 + String(action.payload)
        state.numberStr1 = joinedNum
      } else {
        const joinedNum = num2 + String(action.payload)
        state.numberStr2 = joinedNum
      }

    },
    setOperator(state, action: PayloadAction<MathOperatorType>) {
      const operator = state.operator
      const quantity = state.quantity
      const num1 = +state.numberStr1
      const num2 = +state.numberStr2
      if (!num1)
        state.numberStr1 = String(quantity)
      if (operator) {
        state.numberStr1 = String(CalcMathOperation([num1, num2], operator))
        state.numberStr2 = ""
      }
      state.operator = action.payload

    },
    calcCalculatorQuantity(state) {
      const operator = state.operator
      const num1 = +state.numberStr1
      const num2 = +state.numberStr2

      state.quantity = CalcMathOperation([num1, num2], operator)
      state.numberStr2 = ""
      state.numberStr1 = ""
      state.operator = null
    },
    setChangeDateMenu(state, action: PayloadAction<boolean>) {
      state.isChangeDateMenu = action.payload
    },
    setChooseCategoryMenu(state, action: PayloadAction<boolean>) {
      state.isChooseCategoryMenu = action.payload
    },
    setChooseCategorySlideMenu(state, action: PayloadAction<boolean>) {
      state.isChooseCategorySlideMenu = action.payload
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
      state.account = { name: "", color: "", icon: "", balance: 0 }
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
        balance: number
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
    setCurDateStr(state, action: PayloadAction<string>) {
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
  setChangeTitleMenu,
  setCurDateStr,
  setType,
  setTitle,
  setCategory,
  resetCurTransaction,
  setMenuType,
  setChooseCategoryMenu,
  setChooseAccountMenu,
  addToNum,
  setOperator,
  calcCalculatorQuantity,
  setChangeDateMenu,
  removeLastNumber,
  setChooseCategorySlideMenu
} = CurTransactionSlice.actions
