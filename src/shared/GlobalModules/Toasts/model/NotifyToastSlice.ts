import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type notifyStateType = "error" | "info"

interface initialState {
  message: string
  isShown: boolean
  state: notifyStateType
}

export interface notifyToastShowProps {
  message: string
  state: notifyStateType
}

const initialState = {
  message: "",
  isShown: false,
  state: "info",
} as initialState

export const NotifyToastSlice = createSlice({
  name: "NotifyToastSlice",
  initialState,
  reducers: {
    showNotifyToast(state, action: PayloadAction<notifyToastShowProps>) {
      state.isShown = true
      state.message = action.payload.message
      state.state = action.payload.state
    },
    hideNotifyToast(state) {
      state.isShown = false
    },
    resetNotifyToast(state) {
      state.message = ""
      state.state = "info"
    },
  },
})

export const { showNotifyToast, hideNotifyToast, resetNotifyToast } =
  NotifyToastSlice.actions

export const NotifyReducer = NotifyToastSlice.reducer
