import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isCalendarOpen: boolean
  menusDatesStr: string[]
  chosenDateStr: string
}

const initialState = {
  isCalendarOpen: false,
  menusDatesStr: [],
  chosenDateStr: ""
} as initialState

const CalendarSlice = createSlice({
  name: "CalendarSlice",
  initialState,
  reducers: {
    setCurCalendarDate(state, action: PayloadAction<string>) {
      state.chosenDateStr = action.payload
    },
    setCalendar(state, action: PayloadAction<boolean>) {
      state.isCalendarOpen = action.payload
    },
    updateMenuDates(state, action: PayloadAction<{ initialDate: Date | string }>) {
      const initDate = new Date(action.payload.initialDate)

      const menusDatesStr: string[] = []

      for (let index = -5; index < 6; index++) {
        const date = new Date(initDate.getFullYear(), initDate.getMonth() + index, 1).toUTCString()
        menusDatesStr.push(date)
      }

      state.menusDatesStr = menusDatesStr
    }

  }
})

export const CalendarReducer = CalendarSlice.reducer
export const { updateMenuDates, setCalendar, setCurCalendarDate } = CalendarSlice.actions

