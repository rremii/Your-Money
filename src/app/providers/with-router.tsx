import { FC, Suspense } from "react"
import { BrowserRouter } from "react-router-dom"

export const withRouter = (Component: FC) => () => (
  <BrowserRouter>
    <Suspense fallback={"loading"}>
      <Component />
    </Suspense>
  </BrowserRouter>
)
