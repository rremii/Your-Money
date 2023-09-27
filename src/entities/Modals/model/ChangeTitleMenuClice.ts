import { createSlice } from "@reduxjs/toolkit"

interface initialState {

}

const initialState: initialState = {}

const ChangeTitleMenuSlice = createSlice({
  name: "ChangeTitleMenuSlice",
  initialState,
  reducers: {}
})

export const ChangeTitleMenuReducer = ChangeTitleMenuSlice.reducer
export const {} = ChangeTitleMenuSlice.actions