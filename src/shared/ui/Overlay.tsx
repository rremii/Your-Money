import styled from "styled-components"

export const Overlay = styled.div<{
  $isActive?: boolean
  $zIndex?: number
  $color?: string
}>`
  position: fixed;
  z-index: ${({ $zIndex }) => $zIndex || 5};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ $color }) => $color || "rgba(0, 0, 0, 0.68)"};
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0")};
  pointer-events: ${({ $isActive }) => ($isActive ? "initial" : "none")};
  transition: 0.5s;
`