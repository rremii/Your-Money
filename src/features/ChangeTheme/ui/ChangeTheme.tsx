import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const ChangeTheme = React.memo(() => {
  const dispatch = useAppDispatch()

  const theme = useTypedSelector((state) => state.Settings.theme)

  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("themeMenu"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.theme")}
      subTitle={t("general.themes", { context: theme })}
      icon={Categories}
    />
  )
})
