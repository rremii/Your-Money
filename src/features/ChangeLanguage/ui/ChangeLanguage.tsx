import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"


export const ChangeLanguage = () => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Language" subTitle="English" icon={Categories} />
}
