import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"


export const ChangeTheme = () => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Theme" subTitle="Light" icon={Categories} />
}
