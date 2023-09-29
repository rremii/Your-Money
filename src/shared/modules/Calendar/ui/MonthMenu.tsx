import styled from "styled-components"
import { FC, useContext } from "react"
import { Months } from "@shared/helpers/TimeGap.ts"
import { DatesEqualUpToDays } from "@shared/helpers/DatesEqualUpToDays.ts"
import { GetMonthDays } from "@shared/modules/Calendar/model/GetMonthDays.ts"
import { setCurCalendarDate } from "@shared/modules/Calendar/model/Actions.ts"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"


interface props {
  dateStr: string
}

export const MonthMenu: FC<props> = ({ dateStr }) => {

  const { chosenDateStr, color } = useContext(CalendarContext)


  const { days, weekDayShift } = GetMonthDays(dateStr)


  const OnDayClick = (date: Date) => {
    setCurCalendarDate(date.toUTCString())
  }

  const date = new Date(dateStr)
  const month = Months.get(date.getMonth())
  const year = date.getFullYear()

  return <MonthContentLayout>
    <div className="date">{month} {year}</div>
    <ul className="week-days-box">
      <li className="week-day">S</li>
      <li className="week-day">M</li>
      <li className="week-day">T</li>
      <li className="week-day">W</li>
      <li className="week-day">T</li>
      <li className="week-day">F</li>
      <li className="week-day">S</li>
    </ul>
    <DaysBox $color={color} $daysShift={weekDayShift}>
      <div className="days-shift" />
      {days.map((day) => {
        const isActive = DatesEqualUpToDays(day, chosenDateStr)
        return <div onClick={() => OnDayClick(day)} className={`day ${isActive ? "active" : ""}`}>{day.getDate()}</div>
      })}
    </DaysBox>

  </MonthContentLayout>
}

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
      color: var(--txt-6);
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
    color: var(--txt-5);
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
    color: var(--txt-5);
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
    background-color: ${({ $color }) => $color ? $color : "rgb(63, 81, 181)"};
    color: var(--txt-1);
  }
`