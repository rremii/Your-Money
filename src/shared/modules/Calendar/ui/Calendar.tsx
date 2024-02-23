import styled from "styled-components"
import React, { FC, useContext, useEffect } from "react"
import { MonthSlider } from "@shared/modules/Calendar/ui/MonthSlider.tsx"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import {
  setCalendarColor,
  setCurCalendarDate,
  updateMenuDates,
} from "@shared/modules/Calendar/model/Actions.ts"
import { YearSlider } from "@shared/modules/Calendar/ui/YearSlider.tsx"
import { Header } from "@shared/modules/Calendar/ui/Header.tsx"

interface props {
  initialDate: string
  color: string
  OnChange: (chosenDateStr: string) => void
}

const Calendar: FC<props> = ({ initialDate, OnChange, color }) => {
  const { chosenDateStr, type } = useContext(CalendarContext)

  useEffect(() => {
    OnChange(chosenDateStr)
  }, [chosenDateStr])

  useEffect(() => {
    updateMenuDates({ initialDate })
    setCurCalendarDate(initialDate)
    setCalendarColor(color)
  }, [initialDate, color])

  //todo make optimization probaly make anothe slice for the modal and update the date only when nessecery
  return (
    <CalendarLayout>
      <Header />
      {type === "month" ? <MonthSlider /> : <YearSlider />}
    </CalendarLayout>
  )
}
export default Calendar
const CalendarLayout = styled.div`
  position: relative;
`
