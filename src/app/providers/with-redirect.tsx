import React, { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const withRedirect = (Component: FC) => () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== "/transactions") navigate("/transactions")
  }, [])

  return <Component />

}
