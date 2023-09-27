import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "@entities/Transaction/types.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"


// //
// interface editDto {
//   id: number
//   dateStr: string
//   quantity: number
//   type: TransactionType
//
// }

interface IEditTrans {
  id: number | null
  dateStr: string
  quantity: number
  type: TransactionType
  categoryId: number | null
  accountId: number | null
  title?: string
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


}

const initialState: initialState = {

  id: null,
  dateStr: new Date().toUTCString(),
  quantity: 0,
  title: "",
  type: "expense",
  categoryId: null,
  accountId: null

}

const TransactionSlice = createSlice({
  name: "TransactionSlice",
  initialState,
  reducers: {

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

export const TransactionReducer = TransactionSlice.reducer
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
} = TransactionSlice.actions
