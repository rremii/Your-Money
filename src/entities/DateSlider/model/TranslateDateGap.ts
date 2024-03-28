import { TFunction } from "i18next"
import { DateFilter } from "@entities/Transaction/types.ts"

export const TranslateDateGap = (
  t: TFunction,
  dateGap: string,
  dateFilter: DateFilter
) => {
  if (!dateGap) return ""
  switch (dateFilter) {
    case "day": {
      const day = dateGap.match(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/)
      const month = dateGap.match(
        /January|February|March|April|May|June|July|August|September|October|November|December/
      )
      if (!day || !month) return

      const transDay = t("general.days", { context: day })

      const transMonth = t("general.months", { context: month[0].toLowerCase() as "dec" })

      return (
        dateGap.replace(day[0], transDay).replace(month[0], transMonth) || ""
      )
    }
    case "month": {
      const month = dateGap.match(
        /January|February|March|April|May|June|July|August|September|October|November|December/
      )
      if (!month) return

      const transMonth = t("general.months", { context: month[0].toLowerCase() as "january" })

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
        ...dateGap.matchAll(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g)
      ]
      if (!months.length) return
      const month1 = months[0] || ""
      const month2 = months[1] || ""
      if (!month1 || !month2) return

      const transMonth1 = t("general.months", { context: month1[0].toLowerCase() as "dec" })

      const transMonth2 = t("general.months", { context: month2[0].toLowerCase() as "dec" })

      return (
        dateGap
          .replace(month1[0], transMonth1)
          .replace(month2[0], transMonth2) || ""
      )
    }
  }
}
