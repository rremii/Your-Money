import styled from "styled-components"
import { Header } from "@features/Calendar/ui/Header.tsx"
import { MonthSlider } from "@features/Calendar/ui/MonthSlider.tsx"

export const Calendar = () => {


  return <CalendarLayout>
    <Header />
    <MonthSlider />
  </CalendarLayout>
}
const CalendarLayout = styled.div`



`