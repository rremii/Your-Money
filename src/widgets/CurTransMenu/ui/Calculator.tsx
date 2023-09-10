import styled from "styled-components"
import React, { FC } from "react"
import { OperationBtn } from "@widgets/CurTransMenu/ui/OperationBtn.tsx"
import { DigitBtn } from "@widgets/CurTransMenu/ui/DigitBtn.tsx"
import { SubmitBtn } from "@widgets/CurTransMenu/ui/SubmitBtn.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

interface ICalculatorBtn {
  OnClick: () => void,
  children: React.ReactNode | string,
}

interface props {
  color: string
}

export const Calculator: FC<props> = ({ color }) => {


//todo optimize
  const leftColumnBtns: ICalculatorBtn[] = [
    { OnClick: () => undefined, children: "÷" },
    { OnClick: () => undefined, children: "×" },
    { OnClick: () => undefined, children: "-" },
    { OnClick: () => undefined, children: "+" }
  ]
  const midleBtns: ICalculatorBtn[] = [
    { OnClick: () => undefined, children: "7" },
    { OnClick: () => undefined, children: "8" },
    { OnClick: () => undefined, children: "9" },
    { OnClick: () => undefined, children: "4" },
    { OnClick: () => undefined, children: "5" },
    { OnClick: () => undefined, children: "6" },
    { OnClick: () => undefined, children: "1" },
    { OnClick: () => undefined, children: "2" },
    { OnClick: () => undefined, children: "3" },
    { OnClick: () => undefined, children: "$" },
    { OnClick: () => undefined, children: "0" },
    { OnClick: () => undefined, children: "." }
  ]

  const rightBtns: ICalculatorBtn[] = [
    { OnClick: () => undefined, children: "del" },
    { OnClick: () => undefined, children: "date" }
  ]


  return <CalculatorLayout>
    <div className="left-grid">
      {leftColumnBtns.map(({ children, OnClick }, index) => (
        <OperationBtn key={index} OnClick={OnClick}>{children}</OperationBtn>
      ))}
    </div>
    <div className="middle-grid">
      {midleBtns.map(({ children, OnClick }, index) => (
        <DigitBtn key={index} OnClick={OnClick}>{children}</DigitBtn>
      ))}
    </div>
    <div className="right-grid">
      {rightBtns.map(({ children, OnClick }, index) => (
        <OperationBtn key={index} OnClick={OnClick}>{children}</OperationBtn>
      ))}
      <SubmitBtn bgColor={color} OnClick={() => undefined}>Ok</SubmitBtn>
    </div>
  </CalculatorLayout>
}
const CalculatorLayout = styled.div`
  background-color: var(--bg-1);
  display: grid;

  grid-template-columns: 1fr 3fr 1fr;


  .middle-grid {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(4, 62px);
  }

  .right-grid, .left-grid {
    flex: 1 1 min-content;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 62px);
  }
`