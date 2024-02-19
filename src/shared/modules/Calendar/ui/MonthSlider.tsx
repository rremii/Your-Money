import styled from "styled-components"
import { FC, memo, useContext } from "react"
import { useCalendarSlider } from "@shared/modules/Calendar/model/useCalendarSlider.tsx"
import { MonthMenu } from "@shared/modules/Calendar/ui/MonthMenu.tsx"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"

interface props {}

export const MonthSlider: FC<props> = memo(() => {
  const { menusDatesStr } = useContext(CalendarContext)

  const { sliderRef, OnScroll } = useCalendarSlider({
    menusDates: menusDatesStr,
  })

  return (
    <SliderLayout onScroll={OnScroll} ref={sliderRef}>
      {menusDatesStr.map((date, index) => (
        <MonthMenu key={index} dateStr={date} />
      ))}
    </SliderLayout>
  )
})
const SliderLayout = styled.div`
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  height: min-content;

  &::-webkit-scrollbar {
    height: 5px;
    background-color: rgba(128, 128, 128, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray; /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
  }
`
