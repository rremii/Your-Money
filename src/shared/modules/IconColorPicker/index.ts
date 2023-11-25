import { IconColorPickerProvider } from "@shared/modules/IconColorPicker/model/Provider.tsx"
import IconColorPickerComponent from "@shared/modules/IconColorPicker/ui/IconColorPicker.tsx"


export const IconColorPicker = IconColorPickerProvider<{
  // OnChange: (chosenDateStr: string) => void
  // color: string
}>(IconColorPickerComponent)
