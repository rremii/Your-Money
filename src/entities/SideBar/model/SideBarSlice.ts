import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialStateType {
  isSideBarOpen: boolean

  isModalOverLay: boolean

  isNameMenu: boolean

  isSignOutMenu: boolean
  isPasswordMenu: boolean
}


export enum Menus {
  name = "isNameMenu",
  signOut = "isSignOutMenu",
  password = "isPasswordMenu",
}


const initialState = {
  isSideBarOpen: false,

  isModalOverLay: false,

  isNameMenu: false,
  isSignOutMenu: false,
  isPasswordMenu: false
} as initialStateType

const SideBarSlice = createSlice({
  name: "SideBarSlice",
  initialState,
  reducers: {
    setIsSideBar(state, action: PayloadAction<boolean>) {
      state.isSideBarOpen = action.payload
    },
    openMenu(state, action: PayloadAction<Menus>) {
      state.isModalOverLay = true
      state[action.payload] = true
    },
    closeAllMenus(state) {
      state.isModalOverLay = false
      state.isNameMenu = false
      state.isPasswordMenu = false
      state.isSignOutMenu = false
    }
  }
})
export const { setIsSideBar, openMenu, closeAllMenus } = SideBarSlice.actions
export const SideBarReducer = SideBarSlice.reducer