import { FC } from "react"
import { IconLayout } from "@shared/ui/CustomIcon/IconLayout.tsx"
import AccountCategoryIconComp from "@shared/ui/AccountCategoryIconComp.tsx"

interface props {
  color?: string
  icon: string
  boxColor?: string
  iconSize?: string
  boxSize?: string
  borderRadius?: string
}

export const CustomIcon: FC<props> = ({ icon, boxColor, color, iconSize, boxSize, borderRadius }) => {
  return <IconLayout className="CategoryIcon" $color={color} $boxColor={boxColor} $iconSize={iconSize}
                     $boxSize={boxSize}
                     $borderRadius={borderRadius}>
    {AccountCategoryIconComp.get(icon)}
  </IconLayout>
}
