import { createSlice } from "@reduxjs/toolkit"

interface initialState {

}

const initialState: initialState = {}

const ChooseAccountMenuSlice = createSlice({
  name: "ChooseAccountMenuSlice",
  initialState,
  reducers: {}
})

export const ChooseAccountMenuReducer = ChooseAccountMenuSlice.reducer
export const {} = ChooseAccountMenuSlice.actions