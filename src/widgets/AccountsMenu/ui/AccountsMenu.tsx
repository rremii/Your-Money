import styled from "styled-components"
import { AllAccountsInfo } from "@shared/ui/AllAccountsInfo.tsx"
import { Account } from "@shared/ui/Account.tsx"
import React from "react"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"


export const AccountsMenu = () => {
  const curBalance = useTypedSelector(state => state.CurAccount.balance)


  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  return <AccountsMenuLayout>
    <AllAccountsInfo balance={curBalance} />

    {allAccounts?.map(({ name, balance, icon }) => (
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