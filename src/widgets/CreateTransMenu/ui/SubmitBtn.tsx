import { CalculatorBtn } from "@widgets/CreateTransMenu/ui/CalculatorBtn.tsx"
import React, { FC } from "react"
import styled from "styled-components"


interface props {
  children: React.ReactNode
  OnClick: () => void
  bgColor: string
}

export const SubmitBtn: FC<props> = ({ bgColor, OnClick, children }) => {

  return <CalculatorBtn borderColor={"transparent"} OnClick={OnClick} bgColor={bgColor}>
    <IconLayout>{children}</IconLayout>
  </CalculatorBtn>
}

const IconLayout = styled.span`
  color: white;

`