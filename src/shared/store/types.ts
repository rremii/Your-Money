import { setupStore } from "./ReduxStore"

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]

