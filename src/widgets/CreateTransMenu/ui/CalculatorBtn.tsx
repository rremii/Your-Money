import styled from "styled-components"
import React, { FC } from "react"


interface props {
  bgColor: string
  borderColor: string
  children: React.ReactNode
  OnClick: () => void
}

export const CalculatorBtn: FC<props> = ({ children, borderColor, bgColor, OnClick }) => {

  return <CalculatorCellLayout $borderColor={borderColor} $bgColor={bgColor} onClick={OnClick}>
    {children}
  </CalculatorCellLayout>
}
const CalculatorCellLayout = styled.div<{
  $borderColor?: string
  $bgColor?: string
}>`
  width: 74px;
  min-height: 62px;
  border: 2px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ $bgColor }) => $bgColor};
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;

`