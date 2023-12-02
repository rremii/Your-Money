import styled from "styled-components"
import { AllAccountsInfo } from "@shared/ui/AllAccountsInfo.tsx"
import { Account } from "@shared/ui/Account.tsx"
import React from "react"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"


export const AccountsMenu = () => {

  const allBalance = useTypedSelector(state => state.AllAccount.balance)
  const currencySign = useTypedSelector(state => state.Settings.curCurrencySign)


  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  return <AccountsMenuLayout>
    <AllAccountsInfo allBalance={allBalance} currencySign={currencySign} />

    {allAccounts?.map(({ name, balance, icon, color }) => (
      <Account key={name} balance={balance} name={name} iconNode={
        <CustomIcon icon={icon} boxColor={color} />
      } />
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