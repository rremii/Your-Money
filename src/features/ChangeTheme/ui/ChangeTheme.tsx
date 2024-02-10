import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"

export const ChangeTheme = React.memo(() => {
  const dispatch = useAppDispatch()

  const theme = useTypedSelector((state) => state.Settings.theme)

  const handleClick = () => {
    dispatch(openMenu("themeMenu"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title="Theme"
      subTitle={theme}
      icon={Categories}
    />
  )
})
