import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"

export const ChangeStartScreen = React.memo(() => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Startup screen" subTitle="EditCategoriesSlider" icon={Categories} />
})
