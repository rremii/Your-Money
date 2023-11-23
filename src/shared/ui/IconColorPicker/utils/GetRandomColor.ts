import { Colors } from "@shared/ui/IconColorPicker/constants/colors.ts"

export const GetRandomColor = () => {
  const length = Colors.length
  const id = Math.round(Math.random() * (length - 1))

  return Colors[id]
}