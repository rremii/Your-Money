import styled from "styled-components"
import { FC, memo, useContext } from "react"
import { DatesEqualUpToDays } from "@shared/helpers/DatesEqualUpToDays.ts"
import { GetMonthDays } from "@shared/modules/Calendar/model/GetMonthDays.ts"
import { setCurCalendarDate } from "@shared/modules/Calendar/model/Actions.ts"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import { Months } from "@shared/constants/Months.ts"
import { useTranslation } from "react-i18next"

interface props {
  dateStr: string
}

export const MonthMenu: FC<props> = memo(({ dateStr }) => {
  const { chosenDateStr, color } = useContext(CalendarContext)
  const { t } = useTranslation()

  const { days, weekDayShift } = GetMonthDays(dateStr)

  const OnDayClick = (date: Date) => {
    setCurCalendarDate(date.toUTCString())
  }

  const date = new Date(dateStr || Date.now())
  const month = Months.get(date.getMonth() || 0) as string
  const year = date.getFullYear()

  return (
    <MonthContentLayout>
      <div className="date">
        {t("general.months", {
          context: month.slice(0, 3).toLowerCase() as "dec",
        })}{" "}
        {year}
      </div>
      <ul className="week-days-box">
        <li className="week-day">
          {t("general.days", { context: "sun" }).slice(0, 1).toUpperCase()}
        </li>
        <li className="week-day">
          {t("general.days", { context: "mon" }).slice(0, 1).toUpperCase()}
        </li>
        <li className="week-day">
          {t("general.days", { context: "tue" }).slice(0, 1).toUpperCase()}
        </li>
        <li className="week-day">
          {t("general.days", { context: "wed" }).slice(0, 1).toUpperCase()}
        </li>
        <li className="week-day">
          {t("general.days", { context: "thu" }).slice(0, 1).toUpperCase()}
        </li>
        <li className="week-day">
          {t("general.days", { context: "fri" }).slice(0, 1).toUpperCase()}
        </li>
        <li className="week-day">
          {t("general.days", { context: "sat" }).slice(0, 1).toUpperCase()}
        </li>
      </ul>
      <DaysBox $color={color} $daysShift={weekDayShift}>
        <div className="days-shift" />
        {days.map((day, index) => {
          const isActive = DatesEqualUpToDays(day, chosenDateStr)
          return (
            <div
              key={index}
              onClick={() => OnDayClick(day)}
              className={`day ${isActive ? "active" : ""}`}
            >
              {day.getDate()}
            </div>
          )
        })}
      </DaysBox>
    </MonthContentLayout>
  )
})

const MonthContentLayout = styled.div`
  height: 260px;
  flex: 0 0 320px;
  padding: 0 20px;

  scroll-snap-stop: always;
  scroll-snap-align: center;

  .week-days-box {
    gap: 7px;
    padding: 0 3px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    margin-bottom: 5px;

    .week-day {
      width: 30px;
      text-align: center;
      color: #818181;
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
const DaysBox = styled.div<{
  $daysShift?: number
  $color?: string
}>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  row-gap: 5px;

  .days-shift {
    display: ${({ $daysShift }) => !$daysShift && "none"};
    grid-column: span ${({ $daysShift }) => $daysShift && $daysShift};
  }

  .day {
    cursor: pointer;
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    background-color: ${({ $color }) => ($color ? $color : "rgb(63, 81, 181)")};
    color: #ffffff;
  }
`
