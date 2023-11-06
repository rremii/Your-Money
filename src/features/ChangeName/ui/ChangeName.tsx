import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/Modals/model/ModalsSlice.ts"

export const ChangeName = React.memo(() => {
  const dispatch = useAppDispatch()


  const { data: userInfo } = GetMe.useQueryState()


  const handleClick = () => {
    dispatch(openMenu("nameMenu"))
  }

  return <SideBarBtn onClick={handleClick} title="Name" subTitle={userInfo?.name} icon={Categories} />
})
