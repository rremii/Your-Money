import styled from "styled-components"
import CategoriesIconsComponents from "@shared/modules/IconColorPicker/constants/CategoriesIconsComponents.tsx"
import { FC } from "react"

interface props {
  name: string
  isActive: boolean
}

export const Icon: FC<props> = ({ isActive, name }) => {

  return <IconLayout $isActive={isActive}>
    {CategoriesIconsComponents.get(name)}
  </IconLayout>
}
const IconLayout = styled.div<{
  $isActive?: boolean
}>`

  width: 47px;
  height: 47px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => $isActive ? "rgb(128, 128, 128)" : "transparent"};
  border: 1px solid #E7E7E7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color .3s;

  svg {
    width: 25px;
    height: 25px;
    transition: fill .3s;
    fill: ${({ $isActive }) => $isActive ? "white" : "rgb(128, 128, 128)"};
  }
`