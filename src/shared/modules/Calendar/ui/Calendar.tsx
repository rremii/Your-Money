import styled from "styled-components"
import React, { FC, memo, useContext, useEffect } from "react"
import { Header } from "@shared/modules/IconColorPicker/ui/Header.tsx"
import { MonthSlider } from "@shared/modules/Calendar/ui/MonthSlider.tsx"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import {
  setCalendarColor,
  setCurCalendarDate,
  updateMenuDates,
} from "@shared/modules/Calendar/model/Actions.ts"
import { YearSlider } from "@shared/modules/Calendar/ui/YearSlider.tsx"


interface props {
  initialDate: string
  color: string
  OnChange: (chosenDateStr: string) => void
}

const Calendar: FC<props> = memo(({ initialDate, OnChange, color }) => {

  const { chosenDateStr, type } = useContext(CalendarContext)

  useEffect(() => {
    OnChange(chosenDateStr)
  }, [chosenDateStr])

  useEffect(() => {
    updateMenuDates({ initialDate })
    setCurCalendarDate(initialDate)
    setCalendarColor(color)
  }, [initialDate, color])

  return <CalendarLayout>
    <Header />
    {type === "month" ? <MonthSlider /> : <YearSlider />}
  </CalendarLayout>
})
export default Calendar
const CalendarLayout = styled.div`
  position: relative;
`
