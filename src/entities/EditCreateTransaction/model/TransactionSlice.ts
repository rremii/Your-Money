import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "@entities/Transaction/types.ts"
import { Currency } from "@entities/Currency/types.ts"

interface initialState {
  id: number | null
  dateStr: string
  type: TransactionType
  currency: Currency
  title?: string
}

const initialState: initialState = {

  id: null,
  dateStr: new Date().toUTCString(),
  title: "",
  type: "expense",
  currency: Currency.DefaultCurrency
}

const TransactionSlice = createSlice({
  name: "TransactionSlice",
  initialState,
  reducers: {
    setEditTransaction(state, action: PayloadAction<Omit<initialState, "currency">>) {
      state.id = action.payload.id
      state.title = action.payload.title
      state.type = action.payload.type
      state.dateStr = action.payload.dateStr
    },
    resetEditTransaction(state) {
      state.id = null
      state.title = ""
      state.type = "expense"
      // state.dateStr = new Date().toUTCString()
    },

    setEditTransTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setEditCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload
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
  setEditTransaction,
  setEditCurrency
} = TransactionSlice.actions
