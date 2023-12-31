import React from "react"
import { Route, Routes } from "react-router-dom"
import AppLayout from "../app/layout/AppLayout.tsx"


// const Categories = lazy(() => import("./Categories/CategoriesPage.tsx"))
// const Transactions = lazy(() => import("./Transactions/TransactionsPage.tsx"))
// const Overview = lazy(() => import("./Overview/OverviewPage.tsx"))
// const Accounts = lazy(() => import("./Accounts/AccountsPage.tsx"))
//todo icons https://www.svgrepo.com/collection/responsive-glyph-icons/
import Categories from "./Categories/CategoriesPage.tsx"
import Transactions from "./Transactions/TransactionsPage.tsx"
import Overview from "./Overview/OverviewPage.tsx"
import Accounts from "./Accounts/AccountsPage.tsx"
import SignIn from "./SignIn/SignIn.tsx"
import SignUpEmail from "./SignUp/SignUpEmail.tsx"
import SignUpCode from "./SignUp/SignUpCode.tsx"
import SignUpPassword from "./SignUp/SignUpPassword.tsx"
import Layout from "../app/layout/Layout.tsx"
import SignUpInfo from "./SignUp/SignUpInfo.tsx"
import { usePreloader } from "@shared/hooks/usePreloader.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { useAccountHistoryPoints } from "@entities/AccountHistoryPoint/model/useAccountHistoryPoints.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"


export const Routing = () => {

  // useChangeTheme()

  const isLoggedIn = useTypedSelector(state => state.Auth.isLoggedIn)

  usePreloader(isLoggedIn)

  const { data: user } = GetMe.useQueryState()
  useCategory(user?.id)
  //todo check if i need to launch it here
  const { accountIds, getAccountById } = useAccount(user?.id)
  useAccountHistoryPoints(accountIds, getAccountById)

  // const { convertCurrency } = useCurrencyConverter()

  // console.log(convertCurrency(1, "USD", "BYN"))

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
