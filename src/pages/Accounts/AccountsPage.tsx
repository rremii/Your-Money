import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { AccountsSubHeader } from "@widgets/Header/ui/AccountsSubHeader.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { AccountsMenu } from "@widgets/AccountsMenu/ui/AccountsMenu.tsx"

const AccountsPage = () => {


  return (
    <AccountsLayout>
      <Header
        SubHeader={<AccountsSubHeader />}
        right={<img src={Categories} alt="" />}
      />
      <AccountsMenu />
    </AccountsLayout>
  )
}
export default AccountsPage
const AccountsLayout = styled.div`
  width: 100%;
  height: 100%;
  //flex: 1 1 auto;
  max-height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-1);

`
