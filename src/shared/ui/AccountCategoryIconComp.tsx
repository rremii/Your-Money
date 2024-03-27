import BurgerComp from "../../../public/icons/categories/burgerIcon.svg?react"
import CupComp from "../../../public/icons/categories/cup.svg?react"
import FamilyComp from "../../../public/icons/categories/family.svg?react"
import GiftsComp from "../../../public/icons/categories/gifts.svg?react"
import HealthComp from "../../../public/icons/categories/health.svg?react"
import LeisureComp from "../../../public/icons/categories/leisure.svg?react"
import RestaurantComp from "../../../public/icons/categories/restaurant.svg?react"
import TransportComp from "../../../public/icons/categories/transport.svg?react"
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
