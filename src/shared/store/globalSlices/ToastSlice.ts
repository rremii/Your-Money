import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type toastStateType = "error" | "info"

interface initialState {
  message: string
  isShown: boolean
  state: toastStateType
}

const initialState = {
  message: "",
  isShown: false,
  state: "info"
} as initialState

export const ToastSlice = createSlice({
  name: "ToastSlice",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<{ message: string, state: toastStateType }>) {
      state.isShown = true
      state.message = action.payload.message
      state.state = action.payload.state
    },
    hideToast(state) {
      state.isShown = false
    },
    clearMessage(state) {
      state.message = ""
      state.state = "info"
    }

  }


})

export const { showToast, hideToast, clearMessage } = ToastSlice.actions

export const ToastReducer = ToastSlice.reducer