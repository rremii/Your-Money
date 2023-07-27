import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"


export const ChangeCurrency = () => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Defauld currency" subTitle="United States dollar" icon={Categories} />
}
