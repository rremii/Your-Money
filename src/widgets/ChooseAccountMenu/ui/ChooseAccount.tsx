import { Account } from "@shared/ui/Account.tsx"
import React, { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { setChooseAccountMenu } from "@entities/Modals/model/ChooseAccountMenuClice.ts"
import { IAccount } from "@entities/Account/types.ts"


interface props extends IAccount {
}

export const ChooseAccount: FC<props> = (account) => {
  const { name, color, icon, id, balance } = account

  const dispatch = useAppDispatch()


  const curName = useTypedSelector(state => state.EditCreateTransaction.ChosenAccount.name)


  const SetAccount = (account: IAccount) => {
    dispatch(setAccount(account))
    dispatch(setChooseAccountMenu(false))
  }

  const isActive = curName === name
  const txtColor = isActive ? "var(--txt-1)" : ""
  const bgColor = isActive ? color : ""
  return <Account key={name} quantity={balance} name={name} icon={icon} bgColor={bgColor}
                  color={txtColor} OnClick={() => SetAccount(account)} />
}