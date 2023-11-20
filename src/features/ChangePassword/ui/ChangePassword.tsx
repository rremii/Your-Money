import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"

export const ChangePassword = React.memo(() => {
  const dispatch = useAppDispatch()


  const handleClick = () => {
    dispatch(openMenu("passwordMenu"))
  }

  return <SideBarBtn onClick={handleClick} title="Change password" icon={Categories} />
})
