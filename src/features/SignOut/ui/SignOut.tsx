import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "/icons/general/categories.svg"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"
import LogoutIcon from "@icons/general/logout.svg?react"

export const SignOut = React.memo(() => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const OnClick = () => {
    dispatch(openMenu("signOutMenu"))
  }

  return (
    <SideBarBtn
      onClick={OnClick}
      title={t("sideBar.signOut")}
      Icon={LogoutIcon}
    />
  )
})
