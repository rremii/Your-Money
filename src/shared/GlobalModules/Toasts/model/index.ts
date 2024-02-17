import { combineReducers } from "@reduxjs/toolkit"
import { ModalsReducer } from "@entities/UI/model/ModalsSlice.ts"
import { PagesReducer } from "@entities/UI/model/PagesSlice.ts"
import { NotifyReducer } from "@shared/GlobalModules/Toasts/model/NotifyToastSlice.ts"
import { LoadingReducer } from "@shared/GlobalModules/Toasts/model/LoadingToastSlice.ts"

export const ToastsReducer = combineReducers({
  NotifyToast: NotifyReducer,
  LoadingToast: LoadingReducer,
})
