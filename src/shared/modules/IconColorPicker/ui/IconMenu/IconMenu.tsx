import styled from "styled-components"
import { SliderMenuLayout } from "@shared/modules/IconColorPicker/ui/SliderMenuLayout.tsx"
import Burger from "@shared/assets/LightTheme/burgerIcon.svg?react"
import { Icon } from "@shared/modules/IconColorPicker/ui/IconMenu/Icon.tsx"
import { IconTitle } from "@shared/modules/IconColorPicker/ui/IconMenu/IconTitle.tsx"


export const IconMenu = () => {
  return <IconMenuLayout>
    <IconTitle title={"Accounts"} />
    <Icon isActive={false} name={"burger"} />
    <Icon isActive={false} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <IconTitle title={"Categories"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
    <Icon isActive={true} name={"burger"} />
  </IconMenuLayout>
}
const IconMenuLayout = styled(SliderMenuLayout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
  gap: 10px;
  padding: 15px 20px;
`