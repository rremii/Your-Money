import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const ChangeStartScreen = React.memo(() => {
  const dispatch = useAppDispatch()

  const curScreen = useTypedSelector((state) => state.Settings.startScreen)

  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("startScreenMenu"))
  }

  const translateScreenPath = ("general." +
    curScreen.toLowerCase()) as "general.overview"
  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.startScreen")}
      subTitle={t(translateScreenPath)}
      icon={Categories}
    />
  )
})
