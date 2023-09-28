import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
  reducers: {
    setEditCreateTransMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setEditCreateMenuType(state, action: PayloadAction<IEditCreateMenuType>) {
      state.menuType = action.payload
    }
  }
})

export const EditCreateTransMenuReducer = EditCreateTransMenuSlice.reducer
export const { setEditCreateTransMenu, setEditCreateMenuType } = EditCreateTransMenuSlice.actions