import styled from "styled-components"
import { useContext } from "react"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import { CalendarType } from "@shared/modules/Calendar/types.ts"
import { setCalendarType } from "@shared/modules/Calendar/model/Actions.ts"
import { Days } from "@shared/constants/Days.ts"
import { Months } from "@shared/constants/Months.ts"

export const Header = () => {

  const { chosenDateStr, color, type } = useContext(CalendarContext)

  const date = new Date(chosenDateStr)
  const year = date.getFullYear()
  const day = Days.get(date.getDay())
  const month = Months.get(date.getMonth()) as string
  const dateDay = date.getDate()

  const SetCalendarType = (type: CalendarType) => {
    setCalendarType(type)
  }


  return <HeaderLayout $color={color}>
    <p
      onClick={() => SetCalendarType("year")}
      className={`sub-title ${type === "year" ? "active" : ""}`}>{year || ""}</p>
    <p
      onClick={() => SetCalendarType("month")}
      className={`title ${type === "month" ? "active" : ""}`}>{day || ""}, {month?.slice(0, 3)} {dateDay}</p>
  </HeaderLayout>
}
const HeaderLayout = styled.header<{
  $color?: string
}>`
  padding: 15px;
  background-color: ${({ $color }) => $color ? $color : "rgb(63, 81, 181)"};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  .sub-title, .title {

    transition: 0.3s;
    margin: 0;
    color: var(--txt-1);
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