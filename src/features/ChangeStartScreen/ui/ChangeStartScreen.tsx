import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"

export const ChangeStartScreen = () => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Startup screen" subTitle="CategoriesSlider" icon={Categories} />
}
