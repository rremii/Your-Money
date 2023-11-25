import { FC } from "react"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { AccountsIcons } from "@shared/modules/IconColorPicker/constants/AccountsIcons.ts"

interface props {
  color: string
  account: string
  iconSize?: string
  boxSize?: string
  borderRadius?: string
}

export const AccountIcon: FC<props> = ({ account, color, iconSize, boxSize, borderRadius }) => {
  return <CustomIcon color={color}
                     iconSrc={AccountsIcons.get(account) || ""}
                     iconSize={iconSize}
                     boxSize={boxSize}
                     borderRadius={borderRadius || "5px"} />
}
