import styled from "styled-components"
import React, { FC, useContext, useEffect } from "react"
import { Header } from "@shared/modules/Calendar/ui/Header.tsx"
import { MonthSlider } from "@shared/modules/Calendar/ui/MonthSlider.tsx"
import { CalendarProvider } from "@shared/modules/Calendar/model/Provider.tsx"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"
import { setCurCalendarDate, updateMenuDates } from "@shared/modules/Calendar/model/Actions.ts"


interface props {
  initialDate: string
  OnChange: (chosenDateStr: string) => void
}


const Calendar: FC<props> = ({ initialDate, OnChange }) => {

  const { chosenDateStr } = useContext(CalendarContext)

  useEffect(() => {
    OnChange(chosenDateStr)
  }, [chosenDateStr])

  useEffect(() => {
    updateMenuDates({ initialDate })
    setCurCalendarDate(initialDate)
  }, [initialDate])

  return <CalendarLayout>
    <Header />
    <MonthSlider />
  </CalendarLayout>
}
export default Calendar
const CalendarLayout = styled.div`

`
