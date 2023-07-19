import React from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import AppLayout from "./layout/AppLayout.tsx"

function App() {
  return <Routing />
}

export default withProviders(App)
