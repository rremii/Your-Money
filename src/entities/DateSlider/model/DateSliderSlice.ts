import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DayType } from "@shared/helpers/TimeGap.ts"
import { DateFilter } from "@entities/Transaction/types.ts"

interface initialState {
  allTransDateGap: {
    dateFrom: string
    dateTo: string
  }
  curMenu: {
    dateGap: string
    id: number
  }
  dateFilter: DateFilter
  dateMenuIds: number[]
  firstDay: DayType
}

const initialState = {
  curMenu: {
    dateGap: "",
    id: 0
  },
  allTransDateGap: {
    dateFrom: "",
    dateTo: ""
  },
  dateFilter: "day",
  firstDay: "Sun",
  dateMenuIds: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
} as initialState

const DateSliderSlice = createSlice({
  name: "DateSliderSlice",
  initialState,
  reducers: {
    setCurMenu(state, action: PayloadAction<{ dateGap: string, id: number }>) {
      state.curMenu = action.payload
    },
    setAllTransDateGap(state, action: PayloadAction<{ dateFrom: string, dateTo: string }>) {
      state.allTransDateGap = action.payload
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
export const { setAllTransDateGap, setCurMenu, shiftTransMenuIdsLeft, shiftTransMenuIdsRight } = DateSliderSlice.actions

