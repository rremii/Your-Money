import React, { useEffect } from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js"
import { useLocation, useNavigate } from "react-router-dom"

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  ArcElement)

function App() {


  return <Routing />
}

export default withProviders(App)
