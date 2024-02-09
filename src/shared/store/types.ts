import { setupStore } from "./store.ts"

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
