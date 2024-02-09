import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"

export const ChangeFirstDayWeek = React.memo(() => {
  const handleClick = () => {}

  return (
    <SideBarBtn
      onClick={handleClick}
      title="First Day of week"
      subTitle="Sunday"
      icon={Categories}
    />
  )
})
