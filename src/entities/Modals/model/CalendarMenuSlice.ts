import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const CalendarMenuSlice = createSlice({
  name: "CalendarMenuSlice",
  initialState,
  reducers: {
    setCalendarMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    }
  }
})

export const CalendarMenuReducer = CalendarMenuSlice.reducer
export const { setCalendarMenu } = CalendarMenuSlice.actions