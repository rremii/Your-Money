import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useNavigate } from "react-router-dom"
import { setIsSideBar } from "@entities/SideBar"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import React from "react"

export const SignIn = React.memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const handleClick = () => {
    navigate("/sign-in")
    dispatch(setIsSideBar(false))
  }

  return <SideBarBtn onClick={handleClick} title="Sign in" icon={Categories} />
})
