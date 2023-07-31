import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  message: string
  isShown: boolean
}

const initialState = {
  message: "",
  isShown: false
} as initialState

export const ToastSlice = createSlice({
  name: "ToastSlice",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<string>) {
      state.isShown = true
      state.message = action.payload
    },
    hideToast(state) {
      state.isShown = false
    },
    clearMessage(state) {
      state.message = ""
    }

  }


})

export const { showToast, hideToast, clearMessage } = ToastSlice.actions

export const ToastReducer = ToastSlice.reducer