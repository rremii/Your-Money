import { createSlice } from "@reduxjs/toolkit"

interface initialState {
  icon: string
  name: string
  color: string
}

const initialState: initialState = {}

const ChosenCategory = createSlice({
  name: "ChosenCategory",
  initialState,
  reducers: {}
})

export const ChosenCategoryReducer = ChosenCategory.reducer
export const {} = ChosenCategory.actions