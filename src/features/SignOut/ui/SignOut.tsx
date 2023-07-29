import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { setAuthInitial } from "@entities/Auth/model/AuthSlice.ts"
import { useSignOutMutation } from "@entities/Auth/api/AuthApi.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useNavigate } from "react-router-dom"
import { setIsSideBar } from "@entities/SideBar"

export const SignOut = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const [logout] = useSignOutMutation()


  const handleClick = async () => {
    await logout()
    dispatch(setIsSideBar(false))
    dispatch(setAuthInitial())
    localStorage.removeItem("accessToken")
    navigate("/sign-in")
  }

  return <SideBarBtn onClick={handleClick} title="Sign out" icon={Categories} />
}
