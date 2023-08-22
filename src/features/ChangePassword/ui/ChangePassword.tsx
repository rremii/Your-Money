import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { Menus, openMenu } from "@entities/SideBar/model/SideBarSlice.ts"
import React from "react"

export const ChangePassword = React.memo(() => {
  const dispatch = useAppDispatch()


  const handleClick = () => {
    dispatch(openMenu(Menus.password))
  }

  return <SideBarBtn onClick={handleClick} title="Change password" icon={Categories} />
})
