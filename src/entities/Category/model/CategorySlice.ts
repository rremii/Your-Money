import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { ICategory } from "@entities/Transaction/types.ts"

//todo fix types in entities
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
