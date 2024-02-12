import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

export const ChangeCurrencyFormat = React.memo(() => {
  const dispatch = useAppDispatch()

  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const curCurrencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )

  const handleClick = () => {
    dispatch(openMenu("currencyFormatMenu"))
  }

  const exampleNumber = -12554254.2

  return (
    <SideBarBtn
      onClick={handleClick}
      title="Currency format"
      subTitle={FormatCurrencyString({
        quantity: exampleNumber,
        sign: "-",
        formatString: currencyFormat,
        currencySign: curCurrencySign,
      })}
      icon={Categories}
    />
  )
})
