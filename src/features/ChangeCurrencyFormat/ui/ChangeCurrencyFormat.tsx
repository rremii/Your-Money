import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"


export const ChangeCurrencyFormat = React.memo(() => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Currency format" subTitle="-$ 1,123.90" icon={Categories} />
})
