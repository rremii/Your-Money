import styled from "styled-components"
import React, { FC } from "react"


interface props {
  bgColor: string
  borderColor: string
  children: React.ReactNode
  OnClick: () => void
}

// export const CalculatorBtn: FC<props> = ({ children, borderColor, bgColor, OnClick }) => {
//
//   return <CalculatorCellLayout $borderColor={borderColor} $bgColor={bgColor} onClick={OnClick}>
//     {children}
//   </CalculatorCellLayout>
// }
export const CalculatorBtn = styled.div<{
  $borderColor?: string
  $bgColor?: string
}>`
  cursor: pointer;
  width: 100%;
  max-width: 74px;
  min-height: 62px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ $bgColor }) => $bgColor};
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;

`