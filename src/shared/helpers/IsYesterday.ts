export const IsYesterday = (dateStr: string | Date) => {
  const date = new Date(dateStr)

  const initDate = new Date()
  const dateFrom = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() - 1)
  const dateTo = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate())


  return date >= dateFrom && date < dateTo
}