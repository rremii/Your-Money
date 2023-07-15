import React from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import Layout from "./layout/Layout"

function App() {
  return <Routing />
}

export default withProviders(App)
