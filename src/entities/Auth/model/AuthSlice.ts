import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isLoggedIn: "first loading" | "success" | "rejected"
  isPending: boolean
  email: string
}

const initialState = {
  email: "",
  isLoggedIn: "first loading",
  isPending: true
} as initialState

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {

    setAuthRejected(state) {
      state.isPending = false
      state.isLoggedIn = "rejected"
    },
    setAuthSuccess(state) {
      state.isPending = false
      state.isLoggedIn = "success"
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    }
  }
})

export const { setAuthRejected, setAuthSuccess, setEmail } = AuthSlice.actions

export const AuthReducer = AuthSlice.reducer