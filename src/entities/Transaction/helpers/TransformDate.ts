import { Months } from "@shared/helpers/TimeGap.ts"

export const TransformDate = (curDate: Date) => {

  const date = curDate.getDate().toString().padStart(2, "0")
  let day = curDate.toDateString().slice(0, 3)
  const month = Months.get(curDate.getMonth())
  const year = curDate.getFullYear().toString()


  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  const dayBeforeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  let isToday = false

  if (curDate >= today && curDate < tomorow) {
    day = "TODAY"
    isToday = true
  }
  if (curDate >= dayBeforeYesterday && curDate <= yesterday) day = "YESTERDAY"

  return {
    date, day, month, year, isToday
  }
}