import { FC } from "react"
import { Provider } from "react-redux"
import { store } from "@shared/store/store.ts"

export const withStore = (Component: FC) => () => (
  <Provider store={store}>
    <Component />
  </Provider>
)
