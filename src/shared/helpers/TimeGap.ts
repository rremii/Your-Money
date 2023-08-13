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


export const Months = new Map<number, string>()
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

//todo fix

export type DayType = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"

class TimeGap {
  private GetWeekDaysGap(startDay: DayType) {
    const curDay = new Date().getDay()

    const dayGap = curDay - Days.get(startDay)

    if (dayGap < 0) return (7 - Math.abs(dayGap))

    return dayGap
  }

  GetWeeKGap(firstDay: DayType, index: number) {
    const dayGap = this.GetWeekDaysGap(firstDay)

    const now = new Date()

    const dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayGap + 7 * index)
    const dateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayGap + 7 * (index + 1))

    const monthFrom = Months.get(dateFrom.getMonth()) || ""
    const monthTo = Months.get(dateTo.getMonth()) || ""

    const dateFromStr = dateFrom.getDate() + " " + monthFrom.slice(0, 3)
    const dateToStr = dateTo.getDate() + " " + monthTo.slice(0, 3)
    const dateGap = dateFromStr + " - " + dateToStr + " " + dateTo.getFullYear()

    return { dateFrom, dateTo, dateGap }
  }

  GetDayGap(index: number) {
    const now = new Date()

    const dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index)
    const dateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index + 1)

    const day = dateTo.toUTCString().slice(0, 3)
    const date = dateFrom.getDate()
    const month = Months.get(dateTo.getMonth()) || ""
    const year = dateTo.getFullYear()


    const dateGap = `${day}, ${date} ${month} ${year}`

    return { dateFrom, dateTo, dateGap }
  }

  GetMonthGap(index: number) {
    const now = new Date()

    const dateFromMonth = now.getMonth() + index
    const dateToMonth = now.getMonth() + index + 1

    const dateFrom = new Date(now.getFullYear(), dateFromMonth)
    const dateTo = new Date(now.getFullYear(), dateToMonth)

    const month = Months.get(dateFrom.getMonth()) || ""
    const year = dateFrom.getFullYear()

    const dateGap = `${month} ${year}`

    return { dateFrom, dateTo, dateGap }
  }

  GetYearGap(index: number) {
    const now = new Date()
    const dateFrom = new Date(now.getFullYear() + index, 0, 0)
    const dateTo = new Date(now.getFullYear() + index + 1, 0, 0)

    const year = dateTo.getFullYear()

    const dateGap = `Year ${year}`

    return { dateFrom, dateTo, dateGap }
  }
}

export default new TimeGap()

