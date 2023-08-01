import React from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function App() {

  return <Routing />
}

export default withProviders(App)
