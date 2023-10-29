import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICategory } from "@entities/Category/type.ts"

interface initialState {
  allCategories: ICategory[]
}

const initialState: initialState = {
  allCategories: []
}

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.allCategories = action.payload
    }
  }
})

export const CategoryReducer = CategorySlice.reducer
export const { setCategories } = CategorySlice.actions
