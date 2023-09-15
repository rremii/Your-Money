import { Account } from "@shared/ui/Account.tsx"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import React, { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setAccount, setChooseAccountMenu } from "@entities/CurTransaction/model/CurTransactionSlice.ts"

interface props extends IAccount {

}

export const ChooseAccount: FC<props> = ({ icon, color, id, name, balance }) => {
  const dispatch = useAppDispatch()


  const curName = useTypedSelector(state => state.CurTransaction.account.name)


  const SetAccount = ({ name, color, id, icon }: Omit<IAccount, "balance">) => {
    dispatch(setAccount({
      accountId: id,
      account: {
        name, color, icon
      }
    }))
    dispatch(setChooseAccountMenu(false))
  }

  const isActive = curName === name
  const txtColor = isActive ? "var(--txt-1)" : ""
  const bgColor = isActive ? color : ""
  return <Account key={name} quantity={balance} name={name} icon={icon} bgColor={bgColor}
                  color={txtColor} OnClick={() => SetAccount({ name, id, color, icon })} />
}