import compose from "compose-function"
import { withRouter } from "./with-router"
import { withStore } from "./with-store"
import { withAuth } from "./with-auth.tsx"
import { withRedirect } from "./with-redirect.tsx"

export const withProviders = compose(withRouter, withStore, withRedirect, withAuth)
