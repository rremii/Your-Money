import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"

export const IsCurYear = (dateStr: string | Date) => {
  const date = new Date(dateStr)
  const { dateFrom, dateTo } = timeGap.GetYearGap(0, new Date())

  return IsDateBetween(dateFrom, date, dateTo, "left")
}