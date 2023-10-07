type IncludeOption = "left" | "right" | "both"

export const IsDateBetween = (leftBorder: Date | string, date: Date | string, rightBorder: Date | string, include?: IncludeOption): boolean => {

  if (typeof leftBorder === "string") leftBorder = new Date(leftBorder)
  if (typeof date === "string") date = new Date(date)
  if (typeof rightBorder === "string") rightBorder = new Date(rightBorder)

  switch (include) {

    case "left": {
      return date >= leftBorder && date < rightBorder
    }
    case "right": {
      return date > leftBorder && date <= rightBorder
    }
    case "both": {
      return date >= leftBorder && date <= rightBorder
    }
    default: {
      return date > leftBorder && date < rightBorder
    }
  }
}