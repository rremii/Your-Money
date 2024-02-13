import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import React, { FC } from "react"
import { Account as AccountTemplate } from "@shared/ui/Account.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditAccountMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { setEditAccount } from "@entities/Account/model/NewAccountSlice.ts"
import { Currency } from "@entities/Currency/types.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

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

  const currencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )
  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )

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
      formattedStr={FormatCurrencyString({
        currencySign,
        formatString: currencyFormat,
        quantity: balance,
        sign: balance < 0 ? "-" : "",
      })}
      name={name}
      iconNode={<CustomIcon icon={icon} boxColor={color} />}
    />
  )
}
