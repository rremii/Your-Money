import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"

export const ChangeName = () => {

  const handleClick = () => {

  }

  return <SideBarBtn onClick={handleClick} title="Name" subTitle={"Remi S"} icon={Categories} />
}
