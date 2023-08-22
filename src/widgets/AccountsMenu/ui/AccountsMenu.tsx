import styled from "styled-components"
import { AllAccountsInfo } from "@widgets/AccountsMenu/ui/AllAccountsInfo.tsx"
import { Account } from "@widgets/AccountsMenu/ui/Account.tsx"
import React from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"


export const AccountsMenu = () => {

  const allAccounts = useTypedSelector(state => state.Account.allAccounts)

  return <AccountsMenuLayout>
    <AllAccountsInfo />
    {allAccounts.map(({ name, balance, icon }) => (
      <Account key={name} quantity={balance} name={name} icon={icon} />
    ))}
  </AccountsMenuLayout>
}
const AccountsMenuLayout = styled.main`
  background-color: var(--bg-1);
  width: 100%;
  height: 100%;

  .Account:last-child .accounts-info {
    border-bottom: none;
  }
`