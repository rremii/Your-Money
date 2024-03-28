import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"
import AvatarIcon from "@icons/general/avatar.svg?react"


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
      Icon={AvatarIcon}
    />
  )
})
