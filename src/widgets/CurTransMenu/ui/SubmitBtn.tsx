import { CalculatorBtn } from "@shared/ui/CalculatorBtn.tsx"
import React, { FC } from "react"
import styled from "styled-components"


interface props {
  children: React.ReactNode
  OnClick: () => void
  bgColor: string
}

export const SubmitBtn: FC<props> = ({ bgColor, OnClick, children }) => {

  return <SubmitBtnLayout $borderColor={"transparent"} onClick={OnClick}
                          $bgColor={bgColor}>
    <IconLayout>{children}</IconLayout>
  </SubmitBtnLayout>
}
const SubmitBtnLayout = styled(CalculatorBtn)`
  grid-row: span 2;
`
const IconLayout = styled.span`
  color: white;
  grid-row: 3 /5;
`