import { CalculatorBtn } from "@widgets/CreateTransMenu/ui/CalculatorBtn.tsx"
import React, { FC } from "react"
import styled from "styled-components"


interface props {
  children: React.ReactNode
  OnClick: () => void
}

export const DigitBtn: FC<props> = ({ OnClick, children }) => {

  return <CalculatorBtn borderColor={"var(--bg-14)"} OnClick={OnClick} bgColor={"var(--bg-1)"}>
    <DigitLayout>{children}</DigitLayout>
  </CalculatorBtn>
}

const DigitLayout = styled.span`

  font-size: 22px;
  color: var(--txt-4) !important;

`