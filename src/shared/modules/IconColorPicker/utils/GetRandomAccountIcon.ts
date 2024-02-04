import { pickerIcons } from "@shared/modules/IconColorPicker/constants/PickerIcons.ts"

export const GetRandomAccountIcon = () => {
  const length = pickerIcons.accountIcons.length
  const id = Math.round(Math.random() * (length - 1))

  return pickerIcons.accountIcons[id]
}