export const DatesEqualUpToDays = (initDate1: Date | string, initDate2: Date | string) => {

  const date1 = new Date(initDate1)
  const date2 = new Date(initDate2)

  let isEqual = true

  if (date1.getFullYear() !== date2.getFullYear()) isEqual = false
  if (date1.getMonth() !== date2.getMonth()) isEqual = false
  if (date1.getDate() !== date2.getDate()) isEqual = false


  return isEqual

}