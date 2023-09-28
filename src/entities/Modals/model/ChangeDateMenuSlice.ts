import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const ChangeDateMenuSlice = createSlice({
  name: "ChangeDateMenuSlice",
  initialState,
  reducers: {
    setChangeDateMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    }
  }
})

export const ChangeDateMenuReducer = ChangeDateMenuSlice.reducer
export const { setChangeDateMenu } = ChangeDateMenuSlice.actions