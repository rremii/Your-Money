import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const ChooseAccountMenuSlice = createSlice({
  name: "ChooseAccountMenuSlice",
  initialState,
  reducers: {
    setChooseAccountMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    }
  }
})

export const ChooseAccountMenuReducer = ChooseAccountMenuSlice.reducer
export const { setChooseAccountMenu } = ChooseAccountMenuSlice.actions