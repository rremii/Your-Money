import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICategory } from "@entities/Category/type.ts"
import { TransactionType } from "@entities/Transaction/types.ts"

interface initialState {
  type: TransactionType
}

const initialState: initialState = {
  type: "expense"
}

const NewCategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setNewCategoryType(state, action: PayloadAction<TransactionType>) {
      state.type = action.payload
    }
  }
})

export const NewCategoryReducer = NewCategorySlice.reducer
export const { setNewCategoryType } = NewCategorySlice.actions
