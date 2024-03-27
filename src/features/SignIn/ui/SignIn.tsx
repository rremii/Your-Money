import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "../../../../public/icons/general/categories.png"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const SignIn = React.memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const handleClick = () => {
    navigate("/sign-in")
    dispatch(closeMenu("sideBar"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.signIn")}
      icon={Categories}
    />
  )
})
