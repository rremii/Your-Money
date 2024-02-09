import { FullDays } from "@shared/constants/Days.ts"
import { Months } from "@shared/constants/Months.ts"

export const TransformDate = (curDate: Date) => {
  const date = curDate.getDate().toString().padStart(2, "0")
  let day = FullDays.get(curDate.getDay()) as string
  const month = Months.get(curDate.getMonth()) as string
  const year = curDate.getFullYear().toString()

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  )
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  )
  const dayBeforeYesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  )
  let isToday = false

  if (curDate >= today && curDate < tomorrow) {
    day = "TODAY"
    isToday = true
  }
  if (curDate >= dayBeforeYesterday && curDate <= yesterday) day = "YESTERDAY"

  return {
    date,
    day,
    month,
    year,
    isToday,
  }
}