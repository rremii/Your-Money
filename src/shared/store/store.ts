import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit"
import { Api } from "../api/config/Api"
import { SideBarReducer } from "@entities/SideBar"
import { AuthReducer } from "@entities/Auth/model/AuthSlice.ts"

const rootReducer = combineReducers({
  SideBar: SideBarReducer,
  Auth: AuthReducer,
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
