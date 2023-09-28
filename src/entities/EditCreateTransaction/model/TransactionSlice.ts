import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "@entities/Transaction/types.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"


interface initialState {
  id: number | null
  dateStr: string
  type: TransactionType
  categoryId: number | null
  accountId: number | null
  title?: string
}

const initialState: initialState = {

  id: null,
  dateStr: new Date().toUTCString(),
  title: "",
  type: "expense",
  categoryId: null,
  accountId: null

}

const TransactionSlice = createSlice({
  name: "TransactionSlice",
  initialState,
  reducers: {
    setEditTransaction(state, action: PayloadAction<initialState>) {
      state.id = action.payload.id
      state.title = action.payload.title
      state.type = action.payload.type
      state.accountId = action.payload.accountId
      state.categoryId = action.payload.categoryId
      state.dateStr = action.payload.dateStr
    },
    resetEditTransaction(state) {
      state.id = null
      state.title = ""
      state.type = "expense"
      state.accountId = null
      state.categoryId = null
      state.dateStr = new Date().toUTCString()
    },

    setEditTransTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },


    setEditTransType(state, action: PayloadAction<TransactionType>) {
      state.type = action.payload
    },
    setEditTransDateStr(state, action: PayloadAction<string>) {
      state.dateStr = action.payload
    }
  }
})

export const TransactionReducer = TransactionSlice.reducer
export const {
  setEditTransDateStr,
  setEditTransTitle,
  setEditTransType,
  resetEditTransaction,
  setEditTransaction
} = TransactionSlice.actions
