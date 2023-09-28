import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const ChooseCategorySlideMenuSlice = createSlice({
  name: "ChooseCategorySlideMenuSlice",
  initialState,
  reducers: {
    setChooseCategorySlideMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    }
  }
})

export const ChooseCategorySlideMenuReducer = ChooseCategorySlideMenuSlice.reducer
export const { setChooseCategorySlideMenu } = ChooseCategorySlideMenuSlice.actions