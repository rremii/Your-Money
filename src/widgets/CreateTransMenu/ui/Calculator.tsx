import styled from "styled-components"
import { OperationBtn } from "@widgets/CreateTransMenu/ui/OperationBtn.tsx"
import { DigitBtn } from "@widgets/CreateTransMenu/ui/DigitBtn.tsx"
import { SubmitBtn } from "@widgets/CreateTransMenu/ui/SubmitBtn.tsx"
import React from "react"

interface ICalculatorBtn {
  OnClick: () => void,
  children: React.ReactNode | string,
}

export const Calculator = () => {


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
      {leftColumnBtns.map(({ children, OnClick }) => (
        <OperationBtn OnClick={OnClick}>{children}</OperationBtn>
      ))}
    </div>
    <div className="middle-grid">
      {midleBtns.map(({ children, OnClick }) => (
        <DigitBtn OnClick={OnClick}>{children}</DigitBtn>
      ))}
    </div>
    <div className="right-grid">
      {rightBtns.map(({ children, OnClick }) => (
        <OperationBtn OnClick={OnClick}>{children}</OperationBtn>
      ))}
      <SubmitBtn bgColor={"#795547"} OnClick={() => undefined}>Ok</SubmitBtn>
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