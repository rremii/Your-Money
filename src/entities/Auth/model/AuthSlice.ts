import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isLoggedIn: "first loading" | "success" | "rejected"
  isPending: boolean
  email: string
  avatar: string
  name: string
}

const initialState = {
  email: "",
  isLoggedIn: "first loading",
  isPending: true,
  avatar: "",
  name: ""
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
    setAuthInitial(state) {
      state.isPending = true
      state.isLoggedIn = "first loading"
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setUserInfo(state, action: PayloadAction<{ name: string, avatar: string }>) {
      state.name = action.payload.name
      state.avatar = action.payload.avatar
    }
  }
})

export const { setAuthRejected, setUserInfo, setAuthInitial, setAuthSuccess, setEmail } = AuthSlice.actions

export const AuthReducer = AuthSlice.reducer