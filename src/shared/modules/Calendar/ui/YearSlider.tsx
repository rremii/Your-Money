import styled from "styled-components"
import { useContext, useEffect, useRef } from "react"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import {
  setCalendarType,
  setCurCalendarDate,
  updateMenuDates,
} from "@shared/modules/Calendar/model/Actions.ts"

export const YearSlider = () => {
  const { color, chosenDateStr } = useContext(CalendarContext)

  const yearSliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!yearSliderRef || !yearSliderRef.current) return
    const sliderHeight = yearSliderRef.current.scrollHeight

    yearSliderRef.current.scrollTo(0, sliderHeight / 2 - 130)
  }, [yearSliderRef])

  const thisYear = new Date().getFullYear()
  const chosenDate = new Date(chosenDateStr)
  const chosenYear = chosenDate.getFullYear()
  const yearsAmount = 11
  const years = [...new Array(yearsAmount)].map(
    (_, index) => thisYear + index - Math.floor(yearsAmount / 2),
  )

  const SetYear = (year: number) => {
    const date = new Date(year, chosenDate.getMonth(), chosenDate.getDate())
    setCalendarType("month")
    updateMenuDates({ initialDate: date.toUTCString() })
    setCurCalendarDate(date.toUTCString())
  }

  return (
    <YearSliderLayout ref={yearSliderRef} $color={color}>
      {years.map((year, index) => {
        return (
          <div key={index} onClick={() => SetYear(year)} className={`year-box`}>
            <p className={`year ${year === chosenYear ? "active" : ""}`}>
              {year}
            </p>
          </div>
        )
      })}
    </YearSliderLayout>
  )
}
const YearSliderLayout = styled.div<{
  $color?: string
}>`
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
  overflow-y: auto;
  //flex: 0 0 300px;
  height: 260px;
  //position: relative;
  overflow-x: hidden;

  &:after {
    content: "";
    position: absolute;
    transform: translateY(calc(-50% - 8px));
    box-shadow: 0 7px 6px 0px var(--sub-bg-light);
    left: 0;
    background-color: transparent;
    height: 15px;
    width: 100%;
    overflow-x: hidden;
  }

  &:before {
    content: "";
    position: absolute;
    transform: translateY(calc(50% + 8px));
    box-shadow: 0 -7px 6px 0px var(--sub-bg-light);
    left: 0;
    bottom: 0;
    background-color: transparent;
    height: 15px;
    width: 100%;
    overflow-x: hidden;
  }

  .year-box {
    display: flex;
    align-items: center;
    justify-content: center;

    .year {
      cursor: pointer;
      width: 63px;
      height: 63px;
      border-radius: 50%;
      //background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--sub-txt);
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .active {
      background-color: ${({ $color }) => ($color ? $color : "rgb(63,81,181)")};
      color: var(--txt-1);
    }
  }
`
