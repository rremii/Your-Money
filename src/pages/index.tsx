import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import AppLayout from "../app/layout/AppLayout.tsx"

// const Categories = lazy(() => import("./Categories/CategoriesPage.tsx"))
// const Transactions = lazy(() => import("./Transactions/TransactionsPage.tsx"))
// const Overview = lazy(() => import("./Overview/OverviewPage.tsx"))
// const Accounts = lazy(() => import("./Accounts/AccountsPage.tsx"))
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
import { useGetMeQuery } from "@entities/User/api/UserApi.ts"

//https://theoluwabukolatina.medium.com/file-upload-with-react-hooks-cloudinary-and-react-dropzone-5b6461c303ce
export const Routing = () => {
  const { isLoggedIn, isPending } = useAuth()
  // useChangeTheme()
  const navigate = useNavigate()
  useEffect(() => {
    // navigate("/sign-up/info")
    navigate("/categories")
  }, [])

  // const { data: userInfo } = useGetMeQuery()


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
