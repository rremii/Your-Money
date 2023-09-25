import styled from "styled-components"
import React, { FC } from "react"
import { OperationBtn } from "@widgets/CurTransMenu/ui/OperationBtn.tsx"
import { DigitBtn } from "@widgets/CurTransMenu/ui/DigitBtn.tsx"
import { SubmitBtn } from "@widgets/CurTransMenu/ui/SubmitBtn.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  addToNum,
  calcCalculatorQuantity,
  MathOperatorType, removeLastNumber,
  setChangeDateMenu,
  setOperator
} from "@entities/CurTransaction/model/CurTransactionSlice.ts"

interface ICalculatorBtn {
  OnClick: () => void,
  children: React.ReactNode | string,
}

interface props {
  color: string
}


export const Calculator: FC<props> = ({ color }) => {
  const dispatch = useAppDispatch()

  const operator = useTypedSelector(state => state.CurTransaction.operator)


  const OpenDateMenu = () => {
    dispatch(setChangeDateMenu(true))
  }
  const CalcQuantity = () => {
    dispatch(calcCalculatorQuantity())
  }

  const OnResultClick = () => {


  }

  const RemoveLastNum = () => {
    dispatch(removeLastNumber())
  }
  const AddToNum = (num: number | string) => {
    dispatch(addToNum(num))
  }

  const SetOperator = (operator: MathOperatorType) => {
    dispatch(setOperator(operator))
  }


//todo optimize
  const leftColumnBtns: ICalculatorBtn[] = [
    { OnClick: () => SetOperator("div"), children: "÷" },
    { OnClick: () => SetOperator("mul"), children: "×" },
    { OnClick: () => SetOperator("sub"), children: "-" },
    { OnClick: () => SetOperator("sum"), children: "+" }
  ]
  const midleBtns: ICalculatorBtn[] = [
    { OnClick: () => AddToNum(7), children: "7" },
    { OnClick: () => AddToNum(8), children: "8" },
    { OnClick: () => AddToNum(9), children: "9" },
    { OnClick: () => AddToNum(4), children: "4" },
    { OnClick: () => AddToNum(5), children: "5" },
    { OnClick: () => AddToNum(6), children: "6" },
    { OnClick: () => AddToNum(1), children: "1" },
    { OnClick: () => AddToNum(2), children: "2" },
    { OnClick: () => AddToNum(3), children: "3" },
    { OnClick: () => AddToNum(0), children: "$" },
    { OnClick: () => AddToNum(0), children: "0" },
    { OnClick: () => AddToNum("."), children: "." }
  ]

  const rightBtns: ICalculatorBtn[] = [
    { OnClick: RemoveLastNum, children: "del" },
    { OnClick: OpenDateMenu, children: "date" }
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
      {operator ?
        <SubmitBtn bgColor={color} OnClick={CalcQuantity}>=</SubmitBtn> :
        <SubmitBtn bgColor={color} OnClick={OnResultClick}>Ok</SubmitBtn>}
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