import { createSlice } from "@reduxjs/toolkit"

type IEditCreateMenuType = "overview" | "edit" | "create"

interface initialState {
  isOpen: boolean
  menuType: IEditCreateMenuType
}

const initialState: initialState = {
  isOpen: false,
  menuType: "overview"
}

const EditCreateTransMenuSlice = createSlice({
  name: "EditCreateTransMenuSlice",
  initialState,
  reducers: {}
})

export const EditCreateTransMenuReducer = EditCreateTransMenuSlice.reducer
export const {} = EditCreateTransMenuSlice.actions