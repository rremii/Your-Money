import BurgerComp from "@shared/assets/LightTheme/burgerIcon.svg?react"
import CupComp from "@shared/assets/LightTheme/cup.svg?react"
import { FC } from "react"

interface IconComponents {
  [key: string]: FC<any>
}

const IconComponents: IconComponents = {
  burger: BurgerComp,
  cup: CupComp
}


interface GetComponentsProps {
  fill: string
}

class AccountCategoryIconComp {
  get(name: string, svgParams ?: GetComponentsProps) {

    const Component = IconComponents[name]
    if (!Component) return ""
    return <Component {...svgParams} />
  }
}

export default new AccountCategoryIconComp()


