import React, { lazy, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

const Categories = lazy(() => import("./Categories/CategoriesPage.tsx"))
const Transactions = lazy(() => import("./Transactions/TransactionsPage.tsx"))
const Overview = lazy(() => import("./Overview/OverviewPage.tsx"))
const Accounts = lazy(() => import("./Accounts/AccountsPage.tsx"))

export const Routing = () => {
  // const { isLoggedIn, isPending } = useIsAuth()
  // useChangeTheme()
  const navigate = useNavigate()

  useEffect(() => {
    navigate("categories")
  }, [])

  return (
    <>
      <Routes>
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </>
  )
}
