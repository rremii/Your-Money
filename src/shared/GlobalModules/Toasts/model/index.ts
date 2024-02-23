import { combineReducers } from "@reduxjs/toolkit"
import { NotifyReducer } from "@shared/GlobalModules/Toasts/model/NotifyToastSlice.ts"
import { LoadingReducer } from "@shared/GlobalModules/Toasts/model/LoadingToastSlice.ts"

export const ToastsReducer = combineReducers({
  NotifyToast: NotifyReducer,
  LoadingToast: LoadingReducer,
})
