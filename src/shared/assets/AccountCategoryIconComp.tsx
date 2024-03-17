import BurgerComp from "@shared/assets/LightTheme/burgerIcon.svg?react"
import CupComp from "@shared/assets/LightTheme/cup.svg?react"
import FamilyComp from "@shared/assets/LightTheme/family.svg?react"
import GiftsComp from "@shared/assets/LightTheme/gifts.svg?react"
import HealthComp from "@shared/assets/LightTheme/health.svg?react"
import LeisureComp from "@shared/assets/LightTheme/leisure.svg?react"
import RestaurantComp from "@shared/assets/LightTheme/restaurant.svg?react"
import TransportComp from "@shared/assets/LightTheme/transport.svg?react"
import { FC } from "react"

//todo join with icons
interface IconComponents {
  [key: string]: FC<any>
}

const IconComponents: IconComponents = {
  burger: BurgerComp,
  cup: CupComp,
  family: FamilyComp,
  gifts: GiftsComp,
  health: HealthComp,
  leisure: LeisureComp,
  restaurant: RestaurantComp,
  transport: TransportComp,
}

interface GetComponentsProps {
  fill: string
}

class AccountCategoryIconComp {
  get(name: string, svgParams?: GetComponentsProps) {
    const Component = IconComponents[name]
    if (!Component) return ""
    return <Component {...svgParams} />
  }
}

export default new AccountCategoryIconComp()
