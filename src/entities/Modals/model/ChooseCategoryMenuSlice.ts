import { createSlice } from "@reduxjs/toolkit"

interface initialState {

}

const initialState: initialState = {}

const ChooseCategoryMenuSlice = createSlice({
  name: "ChooseCategoryMenuSlice",
  initialState,
  reducers: {}
})

export const ChooseCategoryMenuReducer = ChooseCategoryMenuSlice.reducer
export const {} = ChooseCategoryMenuSlice.actions