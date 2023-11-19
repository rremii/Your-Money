import { FC } from "react"
import { IconLayout } from "@shared/ui/CustomIcon/IconLayout.tsx"

interface props {
  color: string
  iconSrc: string
  iconSize?: string
  boxSize?: string
  borderRadius?: string
}

export const CustomIcon: FC<props> = ({ iconSrc, color, iconSize, boxSize, borderRadius }) => {
  return <IconLayout className="CategoryIcon" $color={color} $iconSize={iconSize} $boxSize={boxSize}
                     $borderRadius={borderRadius}>
    <img src={iconSrc} alt="category icon" />
  </IconLayout>
}
