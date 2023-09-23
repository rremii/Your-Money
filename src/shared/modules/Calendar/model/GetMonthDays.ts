export const GetMonthDays = (dateStr: string) => {
  const date = new Date(dateStr)
  const daysAmount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const weekDayShift = date.getDay()

  const days: Date[] = []

  for (let index = 0; index < daysAmount; index++) {
    const day = new Date(date.getFullYear(), date.getMonth(), index + 1)
    days.push(day)
  }

  return {
    weekDayShift, days
  }

}