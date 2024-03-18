import styled from "styled-components"

export const CalculatorBtn = styled.button<{
  $borderColor?: string
  $bgColor?: string
}>`
  color: var(--main-txt);
  cursor: pointer;
  width: 100%;
  max-width: 74px;
  min-height: 62px;
  //border: 1px solid ${({ $borderColor }) => $borderColor};
  border: 1px solid rgba(163, 162, 162, 0.13);
  background-color: ${({ $bgColor }) => $bgColor};
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
`
