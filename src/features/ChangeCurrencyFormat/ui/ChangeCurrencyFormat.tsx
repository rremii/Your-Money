import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "/icons/general/categories.svg"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"
import { useTranslation } from "react-i18next"
import CurrencyFormatIcon from "@icons/general/currency-format.svg?react"

export const ChangeCurrencyFormat = React.memo(() => {
  const dispatch = useAppDispatch()

  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat
  )
  const curCurrencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign
  )
  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("currencyFormatMenu"))
  }

  const exampleNumber = -12554254.2

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.currencyFormat")}
      subTitle={FormatCurrencyString({
        quantity: exampleNumber,
        sign: "-",
        formatString: currencyFormat,
        currencySign: curCurrencySign
      })}
      Icon={CurrencyFormatIcon}
    />
  )
})
