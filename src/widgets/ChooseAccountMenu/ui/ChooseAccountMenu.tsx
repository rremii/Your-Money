import styled from "styled-components"
import React from "react"
import { ChooseMenuLayout } from "@shared/ui/ChooseMenuLayout.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { ChooseMenuHeader } from "@shared/ui/ChooseMenuHeader.tsx"
import { AllAccountsInfo } from "@shared/ui/AllAccountsInfo.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { ChooseAccount } from "@widgets/ChooseAccountMenu/ui/ChooseAccount.tsx"
import { closeMenu } from "@entities/Modals/model/ModalsSlice.ts"

export const ChooseAccountMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.Modals.chooseAccountMenu.isOpen)
  const allBalance = useTypedSelector(state => state.AllAccount.balance)
  const curCurrencySign = useTypedSelector(state => state.Settings.curCurrencySign)

  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  const CloseMenu = () => {
    dispatch(closeMenu("chooseAccountMenu"))
  }


  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <AccountMenuLayout $isActive={isOpen}>
      <ChooseMenuHeader content={"from account"} />
      <AllAccountsInfo currencySign={curCurrencySign} allBalance={allBalance} />
      {allAccounts?.map((account) => (
        <ChooseAccount key={account?.id} {...account} />
      ))}
    </AccountMenuLayout>
  </>
})
const AccountMenuLayout = styled(ChooseMenuLayout)`

  padding-bottom: 7px;

  .Account .accounts-info {
    border-bottom: none;
  }
`
