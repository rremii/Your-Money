import styled from "styled-components"

export const RadioBtn = styled.button<{
  $isActive: boolean
}>`
  position: relative;

  width: 19px;
  height: 19px;
  margin-right: 13px;
  border-radius: 50%;
  border: ${({ $isActive }) => ($isActive ? "var(--bg-3)" : "#808080")} solid
    2.5px;

  &::after {
    display: ${({ $isActive }) => ($isActive ? "initial" : "none")};
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 75%;
    background-color: var(--bg-3);
    border-radius: 50%;
  }
`
