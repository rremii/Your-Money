import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import AppLayout from "../app/layout/AppLayout.tsx"

// const Categories = lazy(() => import("./Categories/CategoriesPage.tsx"))
// const Transactions = lazy(() => import("./Transactions/TransactionsPage.tsx"))
// const Overview = lazy(() => import("./Overview/OverviewPage.tsx"))
// const Accounts = lazy(() => import("./Accounts/AccountsPage.tsx"))
//todo icons https://habr.com/ru/articles/276249/
import Categories from "./Categories/CategoriesPage.tsx"
import Transactions from "./Transactions/TransactionsPage.tsx"
import Overview from "./Overview/OverviewPage.tsx"
import Accounts from "./Accounts/AccountsPage.tsx"
import SignIn from "./SignIn/SignIn.tsx"
import SignUpEmail from "./SignUp/SignUpEmail.tsx"
import SignUpCode from "./SignUp/SignUpCode.tsx"
import SignUpPassword from "./SignUp/SignUpPassword.tsx"
import Layout from "../app/layout/Layout.tsx"
import { useAuth } from "@entities/Auth/model/useAuth.ts"
import SignUpInfo from "./SignUp/SignUpInfo.tsx"
import { useToast } from "@shared/hooks/useToast.tsx"

export const Routing = () => {
  const { isLoggedIn, isPending } = useAuth()
  // useChangeTheme()
  const navigate = useNavigate()
  useEffect(() => {
    // navigate("/sign-up/info")
    navigate("/transactions")
  }, [])


  const { ShowToast } = useToast(5000, 1000)

  useEffect(() => {
    if (isLoggedIn === "rejected")
      ShowToast("Please login, the maximum amount of transactions is limited by 20 and synchronization is not available")
  }, [isLoggedIn])

  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up/email" element={<SignUpEmail />} />
          <Route path="/sign-up/code" element={<SignUpCode />} />
          <Route path="/sign-up/info" element={<SignUpInfo />} />
          <Route path="/sign-up/password" element={<SignUpPassword />} />
          <Route
            path="/accounts"
            element={
              <Layout>
                <Accounts />
              </Layout>
            }
          />
          <Route
            path="/categories"
            element={
              <Layout>
                <Categories />
              </Layout>
            }
          />
          <Route
            path="/transactions"
            element={
              <Layout>
                <Transactions />
              </Layout>
            }
          />
          <Route
            path="/overview"
            element={
              <Layout>
                <Overview />
              </Layout>
            }
          />
        </Routes>
      </AppLayout>
    </>
  )
}
