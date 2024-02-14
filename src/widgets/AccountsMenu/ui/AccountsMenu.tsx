import styled from "styled-components"
import { AllAccountsInfo } from "@widgets/AccountsMenu/ui/AllAccountsInfo.tsx"
import React from "react"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Account } from "@widgets/AccountsMenu/ui/Account.tsx"

export const AccountsMenu = () => {
  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const currencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )
  const allBalance = useTypedSelector((state) => state.AllAccount.balance)

  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  return (
    <AccountsMenuLayout>
      <AllAccountsInfo
        currencySign={currencySign}
        currencyFormat={currencyFormat}
        allBalance={allBalance}
      />

      {allAccounts?.map((account) => (
        <Account key={account.name} {...account} />
      ))}
    </AccountsMenuLayout>
  )
}
const AccountsMenuLayout = styled.main`
  background-color: var(--sub-bg);
  width: 100%;
  height: 100%;

  .Account:last-child .accounts-info {
    border-bottom: none;
  }
`
