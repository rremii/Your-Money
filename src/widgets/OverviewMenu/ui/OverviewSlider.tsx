import styled from "styled-components"
import { OverviewMenu } from "@widgets/OverviewMenu/ui/OverviewMenu.tsx"

export const OverviewSlider = () => {


  return <SliderLayout id="slider">
    <OverviewMenu />
    <OverviewMenu />
    <OverviewMenu />
    <OverviewMenu />
    <OverviewMenu />
  </SliderLayout>
}
const SliderLayout = styled.main`
  //background-color: var(--bg-1);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

`
