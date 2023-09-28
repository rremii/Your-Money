import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  id: number | null
  icon: string
  name: string
  color: string
}

const initialState: initialState = {
  id: null,
  name: "",
  color: "",
  icon: ""
}

const ChosenCategory = createSlice({
  name: "ChosenCategory",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<initialState>) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.color = action.payload.color
      state.icon = action.payload.icon
    },
    resetChosenCategory(state) {
      state.id = null
      state.name = ""
      state.color = ""
      state.icon = ""
    }
  }
})

export const ChosenCategoryReducer = ChosenCategory.reducer
export const { setCategory, resetChosenCategory } = ChosenCategory.actions