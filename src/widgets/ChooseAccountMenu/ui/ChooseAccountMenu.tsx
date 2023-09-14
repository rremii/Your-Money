import styled from "styled-components"
import React, { useEffect } from "react"
import { ChooseMenuLayout } from "@shared/ui/ChooseMenuLayout.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { ChooseMenuHeader } from "@shared/ui/ChooseMenuHeader.tsx"
import { AllAccountsInfo } from "@shared/ui/AllAccountsInfo.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { Account } from "@shared/ui/Account.tsx"
import { setAccount, setChooseAccountMenu } from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"

export const ChooseAccountMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.CurTransaction.isChooseAccountMenu)
  const curName = useTypedSelector(state => state.CurTransaction.account.name)
  const curBalance = useTypedSelector(state => state.CurAccount.balance)


  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  const CloseMenu = () => {
    dispatch(setChooseAccountMenu(false))
  }
  const SetAccount = ({ name, color, id, icon }: Omit<IAccount, "balance">) => {

    dispatch(setAccount({
      accountId: id,
      account: {
        name, color, icon
      }
    }))
    dispatch(setChooseAccountMenu(false))
  }

  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <AccountMenuLayout $isActive={isOpen}>
      <ChooseMenuHeader content={"from account"} />
      <AllAccountsInfo balance={curBalance} />
      {allAccounts?.map(({ name, balance, icon, color, id }) => {
        //todo fix create another entity
        const isActive = curName === name
        const txtColor = isActive ? "var(--txt-1)" : ""
        const bgColor = isActive ? color : ""
        return <Account key={name} quantity={balance} name={name} icon={icon} bgColor={bgColor}
                        color={txtColor} OnClick={() => SetAccount({ name, id, color, icon })} />
      })}
    </AccountMenuLayout>
  </>
})
const AccountMenuLayout = styled(ChooseMenuLayout)`

  padding-bottom: 7px;

  .Account .accounts-info {
    border-bottom: none;
  }
`
