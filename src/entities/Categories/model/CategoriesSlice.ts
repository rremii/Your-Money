import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DateFiler } from "@entities/Transaction/model/useGetTransByMenu.tsx"

interface initialState {
  index: number
  dateFilter: DateFiler
  // dateFrom: Date,
  // dateTo: Date,
  dateGap: string
}

const initialState = {
  index: 0,
  dateFilter: "week",
  // dateFrom: Date,
  // dateTo: Date,
  dateGap: ""
} as initialState

export const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState,
  reducers: {
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload
    },
    setDate(state, action: PayloadAction<string>) {
      // state.dateFrom = action.payload.dateFrom
      // state.dateTo = action.payload.dateTo
      state.dateGap = action.payload
    }
  }
})

export const { setIndex, setDate } = CategoriesSlice.actions

export const CategoriesReducer = CategoriesSlice.reducer