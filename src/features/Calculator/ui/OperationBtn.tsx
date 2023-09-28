import { CalculatorBtn } from "@shared/ui/CalculatorBtn.tsx"
import React, { FC } from "react"


interface props {
  children: React.ReactNode
  OnClick: () => void
}

export const OperationBtn: FC<props> = ({ OnClick, children }) => {

  return <CalculatorBtn $borderColor={"var(--bg-13)"} onClick={OnClick}
                        $bgColor={"var(--bg-14)"}>{children}</CalculatorBtn>
}