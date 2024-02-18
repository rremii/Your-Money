import { CalculatorBtn } from "@shared/ui/CalculatorBtn.tsx"
import React, { FC, memo } from "react"
import styled from "styled-components"

interface props {
  children: React.ReactNode
  OnClick: () => void
}

export const DigitBtn: FC<props> = memo(({ OnClick, children }) => {
  return (
    <CalculatorBtn
      $borderColor={"rgba(163, 162, 162, 0.13)"}
      onClick={OnClick}
      $bgColor={"var(--sub-bg)"}
    >
      <DigitLayout>{children}</DigitLayout>
    </CalculatorBtn>
  )
})

const DigitLayout = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 22px;
`
