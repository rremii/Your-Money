import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"

export const IsYesterday = (dateStr: string | Date) => {
  const date = new Date(dateStr)
  const { dateFrom, dateTo } = timeGap.GetMonthGap(-1, new Date())

  return IsDateBetween(dateFrom, date, dateTo, "left")
}