import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"

export const SignIn = React.memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const handleClick = () => {
    navigate("/sign-in")
    dispatch(closeMenu("sideBar"))
  }

  return <SideBarBtn onClick={handleClick} title="Sign in" icon={Categories} />
})
