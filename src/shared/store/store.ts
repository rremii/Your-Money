import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit"
import { Api } from "../api/config/Api"
import { AuthReducer } from "@entities/Auth/model/AuthSlice.ts"
import { ToastReducer } from "@shared/store/globalSlices/ToastSlice.ts"
import { DateReducer } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { CurAccountReducer } from "@entities/Account/model/CurAccountSlice.ts"
import { CategoryReducer } from "@entities/Category/model/CategorySlice.ts"
import { AllAccountReducer } from "@entities/Account/model/AllAccountSlice.ts"
import { EditCreateTransactionReducer } from "@entities/EditCreateTransaction/model"
import { ModalsReducer } from "@entities/Modals/model/ModalsSlice.ts"
import { SettingsReducer } from "@entities/Settings/model/SettingsSlice.ts"
// import { CurrencyReducer } from "@entities/Currency/model/CurrencySlice.ts"


const rootReducer = combineReducers({
  // SideBar: SideBarReducer,
  Auth: AuthReducer,
  Toast: ToastReducer,
  Date: DateReducer,
  CurAccount: CurAccountReducer,
  Category: CategoryReducer,
  EditCreateTransaction: EditCreateTransactionReducer,
  AllAccount: AllAccountReducer,
  Settings: SettingsReducer,
  Modals: ModalsReducer,
  [Api.reducerPath]: Api.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(Api.middleware),
    devTools: true
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
