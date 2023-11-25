import styled from "styled-components"
import React, { FC, memo, useContext, useEffect } from "react"
import { Header } from "@shared/modules/Calendar/ui/Header.tsx"
import { SubHeader } from "@shared/modules/IconColorPicker/ui/SubHeader.tsx"
import { Slider } from "@shared/modules/IconColorPicker/ui/Slider.tsx"


interface props {
  // initialDate: string
  // color: string
  // OnChange: (chosenDateStr: string) => void
}

const IconColorPicker: FC<props> = memo(() => {

  // const { chosenDateStr, type } = useContext(CalendarContext)

  // useEffect(() => {
  //   OnChange(chosenDateStr)
  // }, [chosenDateStr])
  //
  // useEffect(() => {
  //   updateMenuDates({ initialDate })
  //   setCurCalendarDate(initialDate)
  //   setCalendarColor(color)
  // }, [initialDate, color])

  return <CalendarLayout>
    <Header />
    <SubHeader />
    <Slider />
  </CalendarLayout>
})
export default IconColorPicker
const CalendarLayout = styled.div`
  position: relative;
  padding-top: 10px;
`
