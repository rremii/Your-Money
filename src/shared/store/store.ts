import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit"
import { Api } from "../api/config/Api"
import { AuthReducer } from "@entities/Auth/model/AuthSlice.ts"
import { ToastReducer } from "@shared/store/globalSlices/ToastSlice.ts"
import { DateReducer } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { CurAccountReducer } from "@entities/Account/model/CurAccountSlice.ts"
import { NewCategoryReducer } from "@entities/Category/model/NewCategorySlice.ts"
import { AllAccountReducer } from "@entities/Account/model/AllAccountSlice.ts"
import { EditCreateTransactionReducer } from "@entities/EditCreateTransaction/model"
import { SettingsReducer } from "@entities/Settings/model/SettingsSlice.ts"
import { UIReducer } from "@entities/UI/model"
import { NewAccountReducer } from "@entities/Account/model/NewAccountSlice.ts"

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Toast: ToastReducer,
  Date: DateReducer,
  CurAccount: CurAccountReducer,
  NewCategory: NewCategoryReducer,
  NewAccount: NewAccountReducer,
  EditCreateTransaction: EditCreateTransactionReducer,
  AllAccount: AllAccountReducer,
  Settings: SettingsReducer,
  UI: UIReducer,
  [Api.reducerPath]: Api.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(Api.middleware),
    devTools: true,
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
