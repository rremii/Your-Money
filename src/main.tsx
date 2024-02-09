import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App.tsx"
import "@shared/i18n/index.ts"

//todo check react portal for modals
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
