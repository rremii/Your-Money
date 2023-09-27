import { createSlice } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const ChangeDateMenuSlice = createSlice({
  name: "ChangeDateMenuSlice",
  initialState,
  reducers: {}
})

export const ChangeDateMenuReducer = ChangeDateMenuSlice.reducer
export const {} = ChangeDateMenuSlice.actions