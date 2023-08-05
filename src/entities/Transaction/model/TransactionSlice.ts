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
  transMenuIds: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
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
    shiftTransMenuIdsRight(state, action: PayloadAction<{ shiftAmount: number }>) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.transMenuIds
      const index = transMenuIds[transMenuIds.length - 1]

      const newIds: number[] = []

      for (let i = 1; i <= shiftAmount; i++) {
        newIds.push(index + i)
      }


      state.transMenuIds = [...transMenuIds.slice(shiftAmount, transMenuIds.length), ...newIds]
    },
    shiftTransMenuIdsLeft(state, action: PayloadAction<{ shiftAmount: number }>) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.transMenuIds
      const index = transMenuIds[0]

      const newIds: number[] = []

      for (let i = shiftAmount; i > 0; i--) {
        newIds.push(index - i)
      }

      state.transMenuIds = [...newIds, ...transMenuIds.slice(0, transMenuIds.length - shiftAmount)]

    }
  }
})

export const TransactionReducer = TransactionSlice.reducer
export const { setIndex, setDate, shiftTransMenuIdsLeft, shiftTransMenuIdsRight } = TransactionSlice.actions

