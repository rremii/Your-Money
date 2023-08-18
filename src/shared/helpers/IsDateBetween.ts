type IncludeOption = "left" | "right" | "both"

export const IsDateBetween = (leftBorder: Date, date: Date, rightBorder: Date, include?: IncludeOption): Boolean => {
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