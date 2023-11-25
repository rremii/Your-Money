import BurgerIcon from "@shared/assets/LightTheme/burgerIcon.svg?react"
import { FC } from "react"
import { Optionals } from "yup"

interface IconComponents {
  [key: string]: FC<any>
}

export const IconComponents: IconComponents = {
  burger: BurgerIcon
}


interface GetComponentsProps {
  fill: string
}

class CategoriesIconsComponents {
  get(name: string, svgParams ?: GetComponentsProps) {

    const Component = IconComponents[name]

    return <Component {...svgParams} />
  }
}

export default new CategoriesIconsComponents()


