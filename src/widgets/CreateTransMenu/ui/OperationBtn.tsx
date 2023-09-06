import { CalculatorBtn } from "@widgets/CreateTransMenu/ui/CalculatorBtn.tsx"
import React, { FC } from "react"


interface props {
  children: React.ReactNode
  OnClick: () => void
}

export const OperationBtn: FC<props> = ({ OnClick, children }) => {

  return <CalculatorBtn borderColor={"var(--bg-13)"} OnClick={OnClick}
                        bgColor={"var(--bg-14)"}>{children}</CalculatorBtn>
}