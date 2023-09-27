import { createSlice } from "@reduxjs/toolkit"

interface initialState {
  name: string
  icon: string
  color: string,
  balance: number
}

const initialState: initialState = {}

const ChosenAccount = createSlice({
  name: "ChosenAccount",
  initialState,
  reducers: {}
})

export const ChosenAccountReducer = ChosenAccount.reducer
export const {} = ChosenAccount.actions