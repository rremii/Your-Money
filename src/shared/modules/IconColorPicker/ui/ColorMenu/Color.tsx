import styled from "styled-components"
import { FC } from "react"

interface props {
  color: string
  isActive: boolean
}

export const Color: FC<props> = ({ color, isActive }) => {

  return <ColorLayout $isActive={isActive} $color={color} />
}
const ColorLayout = styled.div<{
  $color?: string
  $isActive?: boolean
}>`
  background-color: ${({ $color }) => $color ? $color : "black"};
  width: 47px;
  height: 47px;
  border-radius: 50%;
  transition: background-color .3s;
  position: relative;

  &:after {
    display: ${({ $isActive }) => $isActive ? "initial" : "none"};
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
  }

  &:before {
    display: ${({ $isActive }) => $isActive ? "initial" : "none"};
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 36px;
    height: 36px;
    background-color: ${({ $color }) => $color ? $color : "black"};
    border-radius: 50%;
  }
`