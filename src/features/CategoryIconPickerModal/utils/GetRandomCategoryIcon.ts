import { pickerIcons } from "@features/CategoryIconPickerModal/constants/PickerIcons.ts"

export const GetRandomCategoryIcon = () => {
  const length = pickerIcons.categoryIcons.length
  const id = Math.round(Math.random() * (length - 1))

  return pickerIcons.categoryIcons[id]
}