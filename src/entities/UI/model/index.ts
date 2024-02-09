import { combineReducers } from "@reduxjs/toolkit"
import { ModalsReducer } from "@entities/UI/model/ModalsSlice.ts"
import { PagesReducer } from "@entities/UI/model/PagesSlice.ts"

export const UIReducer = combineReducers({
  Modals: ModalsReducer,
  Pages: PagesReducer,
})