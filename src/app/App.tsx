import React, { Suspense } from "react"
import { withProviders } from "./providers"
import { Routing } from "../pages"
import "./styles/style.scss"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement)

function App() {
  //todo check https://nx-dev-git-feat-cypress-10-nrwl.vercel.app/module-federation/micro-frontend-architecture
  return <Routing />
}

export default withProviders(App)
