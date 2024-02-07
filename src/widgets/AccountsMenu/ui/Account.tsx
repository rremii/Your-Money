import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import React, { FC } from "react"
import { Account as AccountTemplate } from "@shared/ui/Account.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditAccountMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { setEditAccount } from "@entities/Account/model/NewAccountSlice.ts"
import { Currency } from "@entities/Currency/types.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"

interface props {
  name: string
  balance: number
  icon: string
  color: string
  currency: Currency
  id: number
}

export const Account: FC<props> = ({
  color,
  icon,
  name,
  balance,
  id,
  currency,
}) => {
  const dispatch = useAppDispatch()

  const OnClick = () => {
    dispatch(openMenu("editCreateAccountMenu"))
    dispatch(
      setEditAccount({
        icon,
        name,
        color,
        currency,
        id,
        balance,
      }),
    )
    dispatch(setEditAccountMenuType("edit"))
  }

  return (
    <AccountTemplate
      OnClick={OnClick}
      key={name}
      currencySign={DefaultCurrencySigns.get(currency)}
      balance={balance}
      name={name}
      iconNode={<CustomIcon icon={icon} boxColor={color} />}
    />
  )
}