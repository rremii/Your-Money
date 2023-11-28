import { pickerColors } from "@features/CategoryIconPickerModal/constants/PickerColors.ts"

export const GetRandomColor = () => {
  const length = pickerColors.length
  const id = Math.round(Math.random() * (length - 1))

  return pickerColors[id]
}