import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const ChooseCategoryMenuSlice = createSlice({
  name: "ChooseCategoryMenuSlice",
  initialState,
  reducers: {
    setChooseCategoryMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    }
  }
})

export const ChooseCategoryMenuReducer = ChooseCategoryMenuSlice.reducer
export const { setChooseCategoryMenu } = ChooseCategoryMenuSlice.actions