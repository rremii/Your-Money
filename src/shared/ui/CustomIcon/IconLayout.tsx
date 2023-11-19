import styled from "styled-components"

export const IconLayout = styled.div<{
  $color?: string
  $iconSize?: string
  $boxSize?: string
  $borderRadius?: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $color }) => $color || "black"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "50%"};
  width: ${({ $boxSize }) => $boxSize || "45px"};
  height: ${({ $boxSize }) => $boxSize || "45px"};

  img {
    width: ${({ $iconSize }) => $iconSize || "50%"};
    height: ${({ $iconSize }) => $iconSize || "50%"};
    //width: 15px;
    //height: 15px;
  }
`