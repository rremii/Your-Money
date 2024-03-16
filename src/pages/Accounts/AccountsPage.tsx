import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { AccountsSubHeader } from "@widgets/Header/ui/AccountsSubHeader.tsx"
import { AccountsMenu } from "@widgets/AccountsMenu/ui/AccountsMenu.tsx"
import { TopHeader } from "@widgets/Header/ui/TopHeader.tsx"
import { StartCreatingAccount } from "@features/StartCreatingAccount/ui/StartCreatingAccount.tsx"
import { MainMenuPageLayout } from "@shared/ui/MainMenuPageLayout.tsx"

const AccountsPage = () => {
  return (
    <AccountsLayout>
      <Header>
        <TopHeader right={<StartCreatingAccount />} />
        <AccountsSubHeader />
      </Header>
      <AccountsMenu />
    </AccountsLayout>
  )
}
export default AccountsPage
const AccountsLayout = styled(MainMenuPageLayout)`
  //width: 100%;
  //height: 100%;
  //display: flex;
  //flex-direction: column;
  //position: relative;
  //font-size: 30px;
  //max-height: calc(100vh - 55px);
  //background-color: white;
`
