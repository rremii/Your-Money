import styled from "styled-components"

export const IconLayout = styled.div<{
  $color?: string
  $iconSize?: string
  $boxSize?: string
  $boxColor?: string
  $borderRadius?: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $boxColor }) => $boxColor || "black"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "50%"};
  width: ${({ $boxSize }) => $boxSize || "45px"};
  height: ${({ $boxSize }) => $boxSize || "45px"};

  svg {
    fill: ${({ $color }) => $color || "white"};
    width: ${({ $iconSize }) => $iconSize || "50%"};
    height: ${({ $iconSize }) => $iconSize || "50%"};
    //width: 15px;
    //height: 15px;
  }
`