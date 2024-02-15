import { CalculatorBtn } from "@shared/ui/CalculatorBtn.tsx"
import React, { FC, memo } from "react"

interface props {
  children: React.ReactNode
  OnClick: () => void
}

export const OperationBtn: FC<props> = memo(({ OnClick, children }) => {
  return (
    <CalculatorBtn
      $borderColor={"rgba(163, 162, 162, 0.13)"}
      onClick={OnClick}
      $bgColor={"var(--sub-bg-2)"}
    >
      {children}
    </CalculatorBtn>
  )
})
