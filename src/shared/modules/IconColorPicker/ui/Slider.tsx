import styled from "styled-components"
import { usePickerSlider } from "@shared/modules/IconColorPicker/model/usePickerSlider.tsx"
import { IconMenu } from "@shared/modules/IconColorPicker/ui/IconMenu/IconMenu.tsx"
import { ColorMenu } from "@shared/modules/IconColorPicker/ui/ColorMenu/ColorMenu.tsx"

export const Slider = () => {

  const { OnScroll, sliderRef } = usePickerSlider()

  return <SliderLayout ref={sliderRef} onScroll={OnScroll}>
    <IconMenu />
    <ColorMenu />
  </SliderLayout>
}
const SliderLayout = styled.div`
  height: 450px;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`