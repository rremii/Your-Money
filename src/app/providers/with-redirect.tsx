import React, { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const withRedirect = (Component: FC) => () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (location.pathname !== "/accounts") navigate("/accounts")
  }, [])

  return <Component />

}
