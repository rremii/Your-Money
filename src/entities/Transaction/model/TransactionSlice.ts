import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DateFiler } from "@entities/Transaction/model/useGetTransByMenu.tsx"

interface initialState {
  index: number
  dateFilter: DateFiler
  dateGap: string
  transMenuIds: number[]
}

const initialState = {
  index: 0,
  dateFilter: "week",
  dateGap: "",
  transMenuIds: [-4, -3, -2, -1, 0, 1, 2, 3, 4]
} as initialState

const TransactionSlice = createSlice({
  name: "TransactionSlice",
  initialState,
  reducers: {
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload
    },
    setDate(state, action: PayloadAction<string>) {
      state.dateGap = action.payload
    },
    shiftTransMenuIdsRight(state) {
      const transMenuIds = state.transMenuIds
      const index = transMenuIds[transMenuIds.length - 1]
      const newIds = [...transMenuIds.slice(1, transMenuIds.length - 1), index + 1, index + 2]
      // debugger
      state.transMenuIds = newIds
    },
    shiftTransMenuIdsLeft(state) {
      const transMenuIds = state.transMenuIds
      const index = transMenuIds[0]
      const newIds = [index - 2, index - 1, ...transMenuIds.slice(0, transMenuIds.length - 2)]
      // debugger
      state.transMenuIds = newIds

    }
  }
})

export const TransactionReducer = TransactionSlice.reducer
export const { setIndex, setDate, shiftTransMenuIdsLeft, shiftTransMenuIdsRight } = TransactionSlice.actions

