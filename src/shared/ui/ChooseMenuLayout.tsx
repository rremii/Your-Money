import styled from "styled-components"

export const ChooseMenuLayout = styled.div<{
  $isActive?: boolean
}>`
  background-color: var(--sub-bg);
  position: fixed;
  z-index: 50;
  width: 100%;
  top: 50%;
  max-width: 330px;
  left: 50%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  pointer-events: ${({ $isActive }) => ($isActive ? "initial" : "none")};
  transform: translate(calc(-50%), -50%);
  transition: 0.5s;
`
