import React, { FC, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, useLocation, useNavigate } from "react-router-dom"

export const withRedirect = (Component: FC) => () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (location.pathname !== "/accounts") navigate("/accounts")
  }, [])

  return <Component />

}
