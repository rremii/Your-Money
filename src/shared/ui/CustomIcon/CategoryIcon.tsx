import { CategoriesIcons } from "@shared/modules/IconColorPicker/constants/CategoriesIcons.ts"
import { FC } from "react"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"

interface props {
  color: string
  category: string
  iconSize?: string
  boxSize?: string
  borderRadius?: string
}

export const CategoryIcon: FC<props> = ({ category, color, iconSize, boxSize, borderRadius }) => {
  return <CustomIcon color={color}
                     iconSrc={CategoriesIcons.get(category) || ""}
                     iconSize={iconSize}
                     boxSize={boxSize}
                     borderRadius={borderRadius} />
}
