import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DateFilter } from "@entities/Transaction/types.ts"
import { RootState } from "@shared/store/store.ts"
import { DayType } from "@shared/constants/Days.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsToday } from "@shared/helpers/IsToday.ts"

interface initialState {
  initDate: string
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
}

const initialState = {
  initDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ).toUTCString(),
  curMenu: {
    dateGap: "",
    id: 0,
    dateFrom: "",
  },
  allTransDateGap: {
    dateFrom: "",
    dateTo: "",
  },
  dateFilter: window.localStorage.getItem("dateFilter") || "day",
  dateMenuIds: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
} as initialState

//todo optimaze fonts with media queries
//todo remain to some other
const DateSliderSlice = createSlice({
  name: "DateSliderSlice",
  initialState,
  reducers: {
    setCurDate(state, action: PayloadAction<string>) {
      state.dateFilter = "day"
      const { dateGap, dateFrom } = timeGap.GetDayGap(0, action.payload)
      state.initDate = action.payload
      state.dateMenuIds = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      state.curMenu = {
        dateGap,
        id: 0,
        dateFrom: dateFrom.toUTCString(),
      }
    },
    setWeekFilter(
      state,
      action: PayloadAction<{ initDate: string; firstDay: DayType }>,
    ) {
      state.dateFilter = "week"
      const { dateGap, dateFrom } = timeGap.GetWeekGap(
        action.payload.firstDay,
        0,
        action.payload.initDate,
      )
      state.dateMenuIds = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      state.curMenu = {
        dateGap,
        id: 0,
        dateFrom: dateFrom.toUTCString(),
      }
    },
    setMonthFilter(state, action: PayloadAction<string>) {
      state.dateFilter = "month"
      const { dateGap, dateFrom } = timeGap.GetMonthGap(0, action.payload)
      state.dateMenuIds = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      state.curMenu = {
        dateGap,
        id: 0,
        dateFrom: dateFrom.toUTCString(),
      }
    },
    setYearFilter(state, action: PayloadAction<string>) {
      state.dateFilter = "year"
      const { dateGap, dateFrom } = timeGap.GetYearGap(0, action.payload)
      state.dateMenuIds = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      state.curMenu = {
        dateGap,
        id: 0,
        dateFrom: dateFrom.toUTCString(),
      }
    },
    setAllTimeFilter(state) {
      state.dateFilter = "allTime"
      state.dateMenuIds = [0]
      state.curMenu.dateGap = "All time"
      state.curMenu.id = 0
    },
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
      if (state.dateFilter === "allTime") return

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
      if (state.dateFilter === "allTime") return

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
  setCurDate,
  setWeekFilter,
  setYearFilter,
  setMonthFilter,
  setAllTimeFilter,
} = DateSliderSlice.actions

export const IsCurDateToday = createSelector(
  (state: RootState) => state.Date.curMenu.dateFrom,
  (date) => IsToday(date),
)
