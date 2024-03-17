import compose from "compose-function"
import { withRouter } from "./with-router"
import { withStore } from "./with-store"
import { withErrorBoundary } from "./with-errorBoundary.tsx"
import { withSuspense } from "./with-Suspense.tsx"

export const withProviders = compose(
  withErrorBoundary,
  withRouter,
  withStore,
  withSuspense,
)
