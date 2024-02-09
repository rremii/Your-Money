import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"

export const ChangeTheme = React.memo(() => {
  const handleClick = () => {}

  return (
    <SideBarBtn
      onClick={handleClick}
      title="Theme"
      subTitle="Light"
      icon={Categories}
    />
  )
})
