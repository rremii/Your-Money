import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FC, useContext, useEffect } from "react"
import { useCalendarSlider } from "@shared/modules/Calendar/model/useCalendarSlider.tsx"
import { setCurCalendarDate, updateMenuDates } from "@shared/modules/Calendar/model/CalendarSlice.ts"
import { MonthMenu } from "@shared/modules/Calendar/ui/MonthMenu.tsx"
import { setCurDateStr } from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"

interface props {
}

export const MonthSlider: FC<props> = () => {
  const { menusDatesStr } = useContext(CalendarContext)


  const { sliderRef, OnScroll } = useCalendarSlider({ menusDates: menusDatesStr })


  return <SliderLayout onScroll={OnScroll} ref={sliderRef}>
    {menusDatesStr.map((date) => (
      <MonthMenu dateStr={date} />
    ))}
  </SliderLayout>
}
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