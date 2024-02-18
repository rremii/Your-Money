import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DateFilter } from "@entities/Transaction/types.ts"
import { RootState } from "@shared/store/store.ts"
import { DayType } from "@shared/constants/Days.ts"

interface initialState {
  allTransDateGap: {
    dateFrom: string
    dateTo: string
  }
  curMenu: {
    dateGap: string
    id: number
    dateFrom: string
  }
  dateFilter: DateFilter
  dateMenuIds: number[]
  firstDay: DayType
}

const initialState = {
  curMenu: {
    dateGap: "",
    id: 0,
  },
  allTransDateGap: {
    dateFrom: "",
    dateTo: "",
  },
  dateFilter: "day",
  firstDay: "Sun",
  dateMenuIds: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
} as initialState

//todo remain to some other
const DateSliderSlice = createSlice({
  name: "DateSliderSlice",
  initialState,
  reducers: {
    setCurMenu(
      state,
      action: PayloadAction<{ dateGap: string; id: number; dateFrom: string }>,
    ) {
      state.curMenu = action.payload
    },
    setAllTransDateGap(
      state,
      action: PayloadAction<{ dateFrom: string; dateTo: string }>,
    ) {
      state.allTransDateGap = action.payload
    },
    shiftTransMenuIdsRight(
      state,
      action: PayloadAction<{ shiftAmount: number }>,
    ) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.dateMenuIds
      const index = transMenuIds[transMenuIds.length - 1]

      const newIds: number[] = []

      for (let i = 1; i <= shiftAmount; i++) {
        newIds.push(index + i)
      }

      state.dateMenuIds = [
        ...transMenuIds.slice(shiftAmount, transMenuIds.length),
        ...newIds,
      ]
    },
    shiftTransMenuIdsLeft(
      state,
      action: PayloadAction<{ shiftAmount: number }>,
    ) {
      const { shiftAmount } = action.payload
      const transMenuIds = state.dateMenuIds
      const index = transMenuIds[0]

      const newIds: number[] = []

      for (let i = shiftAmount; i > 0; i--) {
        newIds.push(index - i)
      }

      state.dateMenuIds = [
        ...newIds,
        ...transMenuIds.slice(0, transMenuIds.length - shiftAmount),
      ]
    },
  },
})

export const DateReducer = DateSliderSlice.reducer
export const {
  setAllTransDateGap,
  setCurMenu,
  shiftTransMenuIdsLeft,
  shiftTransMenuIdsRight,
} = DateSliderSlice.actions

export const getIsMenuIdZero = createSelector(
  (state: RootState) => state.Date.curMenu.id,
  (menuId) => menuId === 0,
)
