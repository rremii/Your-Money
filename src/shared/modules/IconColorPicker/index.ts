import { IconColorPickerProvider } from "@shared/modules/IconColorPicker/model/Provider.tsx"
import IconColorPickerComponent from "@shared/modules/IconColorPicker/ui/IconColorPicker.tsx"
import { IIconComponents } from "@shared/modules/IconColorPicker/types.ts"

export const IconColorPicker = IconColorPickerProvider<{
  icons: {
    firstSection: string[]
    secondSection: string[]
  }
  colors: string[]
  sectionTitles: {
    firstSection: string
    secondSection: string
  }
  title: string
  subTitles: [string, string]
  initInfo: {
    icon: string
    color: string
  }
  IconComponents: IIconComponents
  OnChange: (values: { color: string; icon: string }) => void
}>(IconColorPickerComponent)

export { IconColorPickerModal } from "@shared/modules/IconColorPicker/ui/IconColorPickerModal.tsx"
