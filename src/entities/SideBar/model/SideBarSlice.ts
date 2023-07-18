import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialStateType {
  isSideBarOpen: boolean
}

const initialState = {
  isSideBarOpen: false,
} as initialStateType

const SideBarSlice = createSlice({
  name: "SideBarSlice",
  initialState,
  reducers: {
    setIsSideBar(state, action: PayloadAction<boolean>) {
      state.isSideBarOpen = action.payload
    },
  },
})
export const { setIsSideBar } = SideBarSlice.actions
export const SideBarReducer = SideBarSlice.reducer