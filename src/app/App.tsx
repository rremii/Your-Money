import React from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

ChartJS.register(CategoryScale, TimeScale,
  LinearScale,
  BarElement,
  ArcElement)

function App() {

  return <Routing />
}

export default withProviders(App)
