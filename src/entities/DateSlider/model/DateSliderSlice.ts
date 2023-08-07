import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DateFiler } from "@entities/Transaction/model/useGetTransByMenus.tsx"

interface initialState {
  index: number
  dateFilter: DateFiler
  dateGap: string
  DateMenuIds: number[]
}

const initialState = {
  index: 0,
  dateFilter: "week",
  dateGap: "",
  DateMenuIds: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
} as initialState

const DateSliderSlice = createSlice({
  name: "DateSliderSlice",
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
      const transMenuIds = state.DateMenuIds
      const index = transMenuIds[transMenuIds.length - 1]

      const newIds: number[] = []

      for (let i = 1; i <= shiftAmount; i++) {
        newIds.push(index + i)
      }


      state.DateMenuIds = [...transMenuIds.slice(shiftAmount, transMenuIds.length), ...newIds]
    },
    shiftTransMenuIdsLeft(state, action: PayloadAction<{ shiftAmount: number }>) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.DateMenuIds
      const index = transMenuIds[0]

      const newIds: number[] = []

      for (let i = shiftAmount; i > 0; i--) {
        newIds.push(index - i)
      }

      state.DateMenuIds = [...newIds, ...transMenuIds.slice(0, transMenuIds.length - shiftAmount)]

    }
  }
})

export const TransactionReducer = DateSliderSlice.reducer
export const { setIndex, setDate, shiftTransMenuIdsLeft, shiftTransMenuIdsRight } = DateSliderSlice.actions

