import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const ChangePassword = React.memo(() => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("passwordMenu"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.password")}
      icon={Categories}
    />
  )
})
