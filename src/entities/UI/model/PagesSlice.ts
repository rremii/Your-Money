import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TransactionType } from "@entities/Transaction/types.ts"


interface initialState {

  categoryPage: {
    isCategoriesEditMode: boolean
  }

}

const initialState: initialState = {
  categoryPage: {
    isCategoriesEditMode: false
  }
}

const PagesSlice = createSlice({
  name: "PagesSlice",
  initialState,
  reducers: {
    setCategoriesEditMode(state, action: PayloadAction<boolean>) {
      state.categoryPage.isCategoriesEditMode = action.payload
    }

  }
})

export const PagesReducer = PagesSlice.reducer
export const { setCategoriesEditMode } = PagesSlice.actions