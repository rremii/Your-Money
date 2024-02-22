import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"

export const ChangeStartScreen = React.memo(() => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(openMenu("startScreenMenu"))
  }
  const curScreen = useTypedSelector((state) => state.Settings.startScreen)

  return (
    <SideBarBtn
      onClick={handleClick}
      title="Startup screen"
      subTitle={curScreen}
      icon={Categories}
    />
  )
})
