import { Account } from "@shared/ui/Account.tsx"
import React, { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { IAccount } from "@entities/Account/types.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"

interface props extends IAccount {
  curName: string
  currencyFormat: string
}

export const ChooseAccount: FC<props> = (account) => {
  const { name, curName, color, icon, id, balance, currencyFormat, currency } =
    account

  const dispatch = useAppDispatch()

  const SetAccount = (account: IAccount) => {
    dispatch(setAccount(account))
    dispatch(closeMenu("chooseAccountMenu"))
  }

  const formattedBalanceStr = FormatCurrencyString({
    currencySign: DefaultCurrencySigns.get(currency) as string,
    quantity: balance,
    formatString: currencyFormat,
    sign: balance < 0 ? "-" : "",
  })

  const isActive = curName === name
  const txtColor = isActive ? "#FFFFFF" : ""
  const bgColor = isActive ? color : ""
  return (
    <Account
      key={name}
      balance={balance}
      name={name}
      bgColor={bgColor}
      color={txtColor}
      OnClick={() => SetAccount(account)}
      iconNode={<CustomIcon icon={icon} color={"white"} boxColor={color} />}
      formattedStr={formattedBalanceStr}
    />
  )
}
