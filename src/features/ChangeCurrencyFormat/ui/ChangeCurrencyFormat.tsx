import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"


export const ChangeCurrencyFormat = () => {


  const handleClick = () => {
  }

  return <SideBarBtn onClick={handleClick} title="Currency format" subTitle="-$ 1,123.90" icon={Categories} />
}
