import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {
  const navigate = useNavigate()


  const handleClick = () => {
    navigate("/sign-in")
  }

  return <SideBarBtn onClick={handleClick} title="Sign in" icon={Categories} />
}
