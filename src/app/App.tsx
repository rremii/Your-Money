import React from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  ArcElement)

function App() {

  return <Routing />
}

export default withProviders(App)
