import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"
import { DayType } from "@shared/constants/Days.ts"

export const IsCurWeek = (dateStr: string | Date, firstDay: DayType = "Sun") => {
  const date = new Date(dateStr)
  const { dateFrom, dateTo } = timeGap.GetWeekGap(firstDay, 0, new Date())

  return IsDateBetween(dateFrom, date, dateTo, "left")
}