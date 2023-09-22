import styled from "styled-components"
import { MonthMenu } from "@features/Calendar/ui/MonthMenu.tsx"

export const MonthSlider = () => {
  return <SliderLayout>
    <MonthMenu />
    <MonthMenu />
    <MonthMenu />
    <MonthMenu />
    <MonthMenu />
    <MonthMenu />
  </SliderLayout>
}
const SliderLayout = styled.div`
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  height: 150px;

  &::-webkit-scrollbar {
    height: 5px;
    background-color: rgba(128, 128, 128, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray; /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
  }
`