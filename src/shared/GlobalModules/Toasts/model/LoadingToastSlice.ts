import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  message: string
  isShown: boolean
}

export interface loadingToastShowProps {
  message: string
}

const initialState = {
  message: "",
  isShown: false,
} as initialState

export const LoadingToastSlice = createSlice({
  name: "LoadingToastSlice",
  initialState,
  reducers: {
    showLoadingToast(state, action: PayloadAction<loadingToastShowProps>) {
      state.isShown = true
      state.message = action.payload.message
    },
    hideLoadingToast(state) {
      state.isShown = false
    },
    resetLoadingToast(state) {
      state.message = ""
    },
  },
})

export const { resetLoadingToast, showLoadingToast, hideLoadingToast } =
  LoadingToastSlice.actions

export const LoadingReducer = LoadingToastSlice.reducer
