import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { InfoSubHeader } from "@widgets/Header/ui/InfoSubHeader.tsx"

const AccountsPage = () => {
  return (
    <AccountsLayout>
      <Header
        SubHeader={<InfoSubHeader>ACCOUNTS</InfoSubHeader>}
        right={<div>ri</div>}
      />
      <main>Accounts</main>
    </AccountsLayout>
  )
}
export default AccountsPage
const AccountsLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //max-width: 450px;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-2);
  //overflow-x: hidden;
  main {
    flex: 1 1 auto;
  }
`
