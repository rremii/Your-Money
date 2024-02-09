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

//todo check if i have it
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement)

function App() {
  //todo check https://nx-dev-git-feat-cypress-10-nrwl.vercel.app/module-federation/micro-frontend-architecture
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routing />
    </Suspense>
  )
}

export default withProviders(App)
