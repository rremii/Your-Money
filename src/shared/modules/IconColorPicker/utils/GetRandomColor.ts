import { pickerColors } from "@shared/modules/IconColorPicker/constants/PickerColors.ts"

export const GetRandomColor = () => {
  const length = pickerColors.length
  const id = Math.round(Math.random() * (length - 1))

  return pickerColors[id]
}