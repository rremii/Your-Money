import { Days, DayType } from "@shared/constants/Days.ts"
import { Months } from "@shared/constants/Months.ts"

class TimeGap {
  private GetWeekDaysGap(startDay: DayType, initDate?: Date) {
    if (!initDate) initDate = new Date()

    const curDay = initDate.getDay()

    const dayGap = curDay - Days.get(startDay)

    if (dayGap < 0) return 7 - Math.abs(dayGap)

    return dayGap
  }

  GetWeekGap(firstDay: DayType, index: number, initDateStr?: string | Date) {
    const initDate = initDateStr ? new Date(initDateStr) : new Date()

    const dayGap = this.GetWeekDaysGap(firstDay, initDate)

    const dateFrom = new Date(
      initDate.getFullYear(),
      initDate.getMonth(),
      initDate.getDate() - dayGap + 7 * index,
    )
    const dateTo = new Date(
      initDate.getFullYear(),
      initDate.getMonth(),
      initDate.getDate() - dayGap + 7 * (index + 1),
    )

    const monthFrom = Months.get(dateFrom.getMonth()) as string
    const monthTo = Months.get(dateTo.getMonth()) as string

    const dateFromStr = dateFrom.getDate() + " " + monthFrom.slice(0, 3)
    const dateToStr = dateTo.getDate() + " " + monthTo.slice(0, 3)
    const dateGap = dateFromStr + " - " + dateToStr + " " + dateTo.getFullYear()

    return { dateFrom, dateTo, dateGap }
  }

  GetDayGap(index: number, initDateStr?: string | Date) {
    const initDate = initDateStr ? new Date(initDateStr) : new Date()

    const dateFrom = new Date(
      initDate.getFullYear(),
      initDate.getMonth(),
      initDate.getDate() + index,
    )
    const dateTo = new Date(
      initDate.getFullYear(),
      initDate.getMonth(),
      initDate.getDate() + index + 1,
    )

    const day = dateTo.toUTCString().slice(0, 3)
    const date = dateFrom.getDate()
    const month = Months.get(dateFrom.getMonth()) || ""
    const year = dateTo.getFullYear()

    const dateGap = `${day}, ${date} ${month} ${year}`

    return { dateFrom, dateTo, dateGap }
  }

  GetMonthGap(index: number, initDateStr?: string | Date) {
    const initDate = initDateStr ? new Date(initDateStr) : new Date()

    const dateFromMonth = initDate.getMonth() + index
    const dateToMonth = initDate.getMonth() + index + 1

    const dateFrom = new Date(initDate.getFullYear(), dateFromMonth)
    const dateTo = new Date(initDate.getFullYear(), dateToMonth)

    const month = Months.get(dateFrom.getMonth()) || ""
    const year = dateFrom.getFullYear()

    const dateGap = `${month} ${year}`

    return { dateFrom, dateTo, dateGap }
  }

  GetYearGap(index: number = 0, initDateStr?: string | Date) {
    const initDate = initDateStr ? new Date(initDateStr) : new Date()

    const dateFrom = new Date(initDate.getFullYear() + index, 0, 1)
    const dateTo = new Date(initDate.getFullYear() + index + 1, 0, 1)

    const year = dateFrom.getFullYear()

    const dateGap = `Year ${year}`

    return { dateFrom, dateTo, dateGap }
  }
}

export const timeGap = new TimeGap()
