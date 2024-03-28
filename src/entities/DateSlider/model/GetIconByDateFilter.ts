import { DateFilter } from "@entities/Transaction/types.ts"
import YearIcon from "@icons/general/year.svg?react"
import WeekIcon from "@icons/general/week.svg?react"
import AllTimeIcon from "@icons/general/infinity.svg?react"
import MonthIcon from "@icons/general/month.svg?react"
import DayIcon from "@icons/general/day.svg?react"


export const GetIconByDateFilter = (filter: DateFilter) => {
  switch (filter) {
    case "allTime":
      return AllTimeIcon

    case "day":
      return DayIcon

    case "month":
      return MonthIcon

    case "week":
      return WeekIcon

    case "year":
      return YearIcon

    default:
      return DayIcon
  }
}