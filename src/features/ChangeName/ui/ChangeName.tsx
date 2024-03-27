import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "../../../../public/icons/general/categories.png"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const ChangeName = React.memo(() => {
  const dispatch = useAppDispatch()

  const { data: userInfo } = GetMe.useQueryState()
  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("nameMenu"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.name")}
      subTitle={userInfo?.name}
      icon={Categories}
    />
  )
})
