import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DayType } from "@shared/helpers/TimeGap.ts"
import { DateFilter } from "@entities/Transaction/types.ts"

interface initialState {
  sliderScroll: number
  dateFilter: DateFilter
  dateGap: string
  dateMenuIds: number[]
  firstDay: DayType
}

const initialState = {
  sliderScroll: 0,
  dateFilter: "week",
  firstDay: "Sun",
  dateGap: "",
  dateMenuIds: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
} as initialState

const DateSliderSlice = createSlice({
  name: "DateSliderSlice",
  initialState,
  reducers: {
    setSliderScroll(state, action: PayloadAction<number>) {
      state.sliderScroll = action.payload
    },
    setDate(state, action: PayloadAction<string>) {
      state.dateGap = action.payload
    },
    shiftTransMenuIdsRight(state, action: PayloadAction<{ shiftAmount: number }>) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.dateMenuIds
      const index = transMenuIds[transMenuIds.length - 1]

      const newIds: number[] = []

      for (let i = 1; i <= shiftAmount; i++) {
        newIds.push(index + i)
      }


      state.dateMenuIds = [...transMenuIds.slice(shiftAmount, transMenuIds.length), ...newIds]
    },
    shiftTransMenuIdsLeft(state, action: PayloadAction<{ shiftAmount: number }>) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.dateMenuIds
      const index = transMenuIds[0]

      const newIds: number[] = []

      for (let i = shiftAmount; i > 0; i--) {
        newIds.push(index - i)
      }

      state.dateMenuIds = [...newIds, ...transMenuIds.slice(0, transMenuIds.length - shiftAmount)]

    }
  }
})

export const DateReducer = DateSliderSlice.reducer
export const { setSliderScroll, setDate, shiftTransMenuIdsLeft, shiftTransMenuIdsRight } = DateSliderSlice.actions

