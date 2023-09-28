import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  isOpen: boolean
}

const initialState: initialState = {
  isOpen: false
}

const ChangeTitleMenuSlice = createSlice({
  name: "ChangeTitleMenuSlice",
  initialState,
  reducers: {
    setChangeTitleMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    }
  }
})

export const ChangeTitleMenuReducer = ChangeTitleMenuSlice.reducer
export const { setChangeTitleMenu } = ChangeTitleMenuSlice.actions