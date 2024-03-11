import { Account } from "@shared/ui/Account.tsx"
import React, { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { IAccount } from "@entities/Account/types.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { setCurAccount } from "@entities/Account/model/CurAccountSlice.ts"
import { useTranslation } from "react-i18next"

interface props extends IAccount {
  curName: string
  currencyFormat: string
}

export const ChooseAccount: FC<props> = ({
  curName,
  currencyFormat,
  ...account
}) => {
  const { name, color, icon, balance, id, currency } = account

  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const SetAccount = (account: IAccount) => {
    window.localStorage.setItem("curAccountId", String(id))
    dispatch(setCurAccount(account))
    dispatch(closeMenu("changeAccountMenu"))
  }

  const formattedBalanceStr = FormatCurrencyString({
    currencySign: DefaultCurrencySigns.get(currency) as string,
    quantity: balance,
    formatString: currencyFormat,
    sign: balance < 0 ? "-" : "",
  })

  const isActive = curName === name
  const txtColor = isActive ? "white" : ""
  const bgColor = isActive ? color : ""

  const translatedAccName = id === null ? t("changeAccount.allAccounts") : name
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
