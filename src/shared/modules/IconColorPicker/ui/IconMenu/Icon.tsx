import styled from "styled-components"
import { FC, memo } from "react"
import { IIconComponents } from "@shared/modules/IconColorPicker/types.ts"

interface props {
  name: string
  isActive: boolean
  OnClick?: (icon: string) => void
  IconComponents: IIconComponents | null
}

export const Icon: FC<props> = memo(
  ({ isActive, name, OnClick, IconComponents }) => {
    const HandleClick = () => {
      if (OnClick) OnClick(name)
    }

    return (
      <IconLayout onClick={HandleClick} $isActive={isActive}>
        {IconComponents && IconComponents.get(name)}
      </IconLayout>
    )
  },
)
const IconLayout = styled.button<{
  $isActive?: boolean
}>`
  cursor: pointer;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background-color: ${({ $isActive }) =>
    $isActive ? "rgb(128, 128, 128)" : "transparent"};
  border: 1px solid #e7e7e7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  svg {
    width: 25px;
    height: 25px;
    transition: fill 0.3s;
    fill: ${({ $isActive }) => ($isActive ? "white" : "rgb(128, 128, 128)")};
  }
`
