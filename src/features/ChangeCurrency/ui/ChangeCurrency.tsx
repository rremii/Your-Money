import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { CurrencyNames } from "@entities/Currency/constants/CurrencyNames.ts"


export const ChangeCurrency = React.memo(() => {
  const dispatch = useAppDispatch()

  const curCurrency = useTypedSelector(state => state.Settings.curCurrency)

  const handleClick = () => {
    dispatch(openMenu("currencyMenu"))
  }

  return <SideBarBtn onClick={handleClick} title="Default currency" subTitle={CurrencyNames.get(curCurrency)}
                     icon={Categories} />
})
