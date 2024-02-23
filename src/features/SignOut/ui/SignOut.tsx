import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"

export const SignOut = React.memo(() => {
  const dispatch = useAppDispatch()

  const OnClick = () => {
    dispatch(openMenu("signOutMenu"))
  }

  return <SideBarBtn onClick={OnClick} title="Sign out" icon={Categories} />
})
