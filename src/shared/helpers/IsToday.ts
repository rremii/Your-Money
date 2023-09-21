export const IsToday = (dateStr: string | Date) => {
  const date = new Date(dateStr)

  const initDate = new Date()
  const dateFrom = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate())
  const dateTo = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() + 1)


  return date >= dateFrom && date < dateTo
}