export const Days = new Map()
Days.set("Sun", 0)
Days.set("Mon", 1)
Days.set("Tue", 2)
Days.set("Wed", 3)
Days.set("Thu", 4)
Days.set("Fri", 5)
Days.set("Sat", 6)

export const FullDays = new Map()
FullDays.set("Sunday", 0)
FullDays.set("Monday", 1)
FullDays.set("Tuesday", 2)
FullDays.set("Wednesday", 3)
FullDays.set("Thursday", 4)
FullDays.set("Friday", 5)
FullDays.set("Saturday", 6)
FullDays.set(0, "Sunday")
FullDays.set(1, "Monday")
FullDays.set(2, "Tuesday")
FullDays.set(3, "Wednesday")
FullDays.set(4, "Thursday")
FullDays.set(5, "Friday")
FullDays.set(6, "Saturday")


export const Months = new Map<number | string, string | number>()
Months.set(0, "January")
Months.set(1, "February")
Months.set(2, "March")
Months.set(3, "April")
Months.set(4, "May")
Months.set(5, "June")
Months.set(6, "July")
Months.set(7, "August")
Months.set(8, "September")
Months.set(9, "October")
Months.set(10, "November")
Months.set(11, "December")
Months.set("January", 0)
Months.set("February", 1)
Months.set("March", 2)
Months.set("April", 3)
Months.set("May", 4)
Months.set("June", 5)
Months.set("July", 6)
Months.set("August", 7)
Months.set("September", 8)
Months.set("October", 9)
Months.set("November", 10)
Months.set("December", 11)

//todo fix

export type DayType = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"

class TimeGap {
  private GetWeekDaysGap(startDay: DayType, initDate?: Date) {
    if (!initDate) initDate = new Date()

    const curDay = initDate.getDay()

    const dayGap = curDay - Days.get(startDay)

    if (dayGap < 0) return (7 - Math.abs(dayGap))

    return dayGap
  }

  GetWeekGap(firstDay: DayType, index: number, initDate?: Date) {
    const dayGap = this.GetWeekDaysGap(firstDay, initDate)

    if (!initDate) initDate = new Date()

    const dateFrom = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() - dayGap + 7 * index)
    const dateTo = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() - dayGap + 7 * (index + 1))

    const monthFrom = Months.get(dateFrom.getMonth()) as string
    const monthTo = Months.get(dateTo.getMonth()) as string

    const dateFromStr = dateFrom.getDate() + " " + monthFrom.slice(0, 3)
    const dateToStr = dateTo.getDate() + " " + monthTo.slice(0, 3)
    const dateGap = dateFromStr + " - " + dateToStr + " " + dateTo.getFullYear()

    return { dateFrom, dateTo, dateGap }
  }

  GetDayGap(index: number, initDate?: Date) {
    if (!initDate) initDate = new Date()


    const dateFrom = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() + index)
    const dateTo = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() + index + 1)

    const day = dateTo.toUTCString().slice(0, 3)
    const date = dateFrom.getDate()
    const month = Months.get(dateFrom.getMonth()) || ""
    const year = dateTo.getFullYear()


    const dateGap = `${day}, ${date} ${month} ${year}`

    return { dateFrom, dateTo, dateGap }
  }

  GetMonthGap(index: number, initDate?: Date) {
    if (!initDate) initDate = new Date()


    const dateFromMonth = initDate.getMonth() + index
    const dateToMonth = initDate.getMonth() + index + 1

    const dateFrom = new Date(initDate.getFullYear(), dateFromMonth)
    const dateTo = new Date(initDate.getFullYear(), dateToMonth)

    const month = Months.get(dateFrom.getMonth()) || ""
    const year = dateFrom.getFullYear()

    const dateGap = `${month} ${year}`

    return { dateFrom, dateTo, dateGap }
  }

  GetYearGap(index: number, initDate?: Date) {
    if (!initDate) initDate = new Date()

    const dateFrom = new Date(initDate.getFullYear() + index, 0, 1)
    const dateTo = new Date(initDate.getFullYear() + index + 1, 0, 1)

    const year = dateFrom.getFullYear()

    const dateGap = `Year ${year}`

    return { dateFrom, dateTo, dateGap }
  }
}

export const timeGap = new TimeGap()

