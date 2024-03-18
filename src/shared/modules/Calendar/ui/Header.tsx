import styled from "styled-components"
import { useContext } from "react"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import { CalendarType } from "@shared/modules/Calendar/types.ts"
import { setCalendarType } from "@shared/modules/Calendar/model/Actions.ts"
import { Days } from "@shared/constants/Days.ts"
import { Months } from "@shared/constants/Months.ts"
import { useTranslation } from "react-i18next"

export const Header = () => {
  const { chosenDateStr, color, type } = useContext(CalendarContext)
  const { t } = useTranslation()

  const date = new Date(chosenDateStr || Date.now())
  const year = date.getFullYear()

  const day = Days.get(date.getDay() || 0)
  const month = Months.get(date.getMonth() || 0) as string
  const dateDay = date.getDate()

  const SetCalendarType = (type: CalendarType) => {
    setCalendarType(type)
  }

  const resultDayMonthStr = `${
    t("general.days", { context: day.toLowerCase() }).slice(0, 3) + "." || ""
  }, ${t("general.months", {
    context: [month.slice(0, 3).toLowerCase()],
  })} ${dateDay}`
  return (
    <HeaderLayout $color={color}>
      <h3
        onClick={() => SetCalendarType("year")}
        className={`sub-title ${type === "year" ? "active" : ""}`}
      >
        {year || ""}
      </h3>
      <h2
        onClick={() => SetCalendarType("month")}
        className={`title ${type === "month" ? "active" : ""}`}
      >
        {resultDayMonthStr}
      </h2>
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header<{
  $color?: string
}>`
  padding: 15px;
  background-color: ${({ $color }) => ($color ? $color : "rgb(63, 81, 181)")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  .sub-title,
  .title {
    transition: 0.3s;
    margin: 0;
    color: white;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    opacity: 0.5;
  }

  .sub-title {
    font-size: 14px;
  }

  .title {
    font-size: 27px;
  }

  .active {
    opacity: 1;
  }
`
