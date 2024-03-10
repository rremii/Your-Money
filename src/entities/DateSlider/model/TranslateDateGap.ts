import { TFunction } from "i18next"
import { DateFilter } from "@entities/Transaction/types.ts"

export const TranslateDateGap = (
  t: TFunction,
  dateGap: string,
  dateFilter: DateFilter,
) => {
  if (!dateGap) return ""
  switch (dateFilter) {
    case "day": {
      const day = dateGap.match(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/)
      const month = dateGap.match(
        /January|February|March|April|May|June|July|August|September|October|November|December/,
      )
      if (!day || !month) return

      const dayTransPath = ("general.days." +
        day[0].toLowerCase()) as "general.days.fri"
      const transDay = t(dayTransPath)

      const monthTransPath = ("general.months." +
        month[0].toLowerCase()) as "general.months.june"
      const transMonth = t(monthTransPath)

      return (
        dateGap.replace(day[0], transDay).replace(month[0], transMonth) || ""
      )
    }
    case "month": {
      const month = dateGap.match(
        /January|February|March|April|May|June|July|August|September|October|November|December/,
      )
      if (!month) return

      const monthTransPath = ("general.months." +
        month[0].toLowerCase()) as "general.months.june"
      const transMonth = t(monthTransPath)

      return dateGap.replace(month[0], transMonth) || ""
    }
    case "year": {
      const transYear = t("general.time.year")

      return dateGap.replace("Year", transYear) || ""
    }
    case "allTime": {
      return t("dateRange.allTime")
    }
    case "week": {
      const months = [
        ...dateGap.matchAll(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g),
      ]
      if (!months.length) return
      const month1 = months[0][0] || ""
      const month2 = months[1][0] || ""

      const month1TransPath = ("general.months." +
        month1.toLowerCase()) as "general.months.june"
      const transMonth1 = t(month1TransPath)

      const month2TransPath = ("general.months." +
        month2.toLowerCase()) as "general.months.june"
      const transMonth2 = t(month2TransPath)

      return (
        dateGap.replace(month1, transMonth1).replace(month2, transMonth2) || ""
      )
    }
  }
}
