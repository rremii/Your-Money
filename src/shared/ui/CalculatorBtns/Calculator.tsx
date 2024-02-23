import styled from "styled-components"
import React, { FC, memo, useCallback } from "react"

import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { calcCalculatorQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { OperationBtn } from "@shared/ui/CalculatorBtns/OperationBtn.tsx"
import { DigitBtn } from "@shared/ui/CalculatorBtns/DigitBtn.tsx"
import { SubmitBtn } from "@features/Calculator/ui/SubmitBtn.tsx"
import { useGetCalculatorGridBtns } from "@features/Calculator/model/useGetCalculatorGridBtns.tsx"

interface props {
  children: React.ReactNode
}

export const Calculator: FC<props> = memo(({ children }) => {
  const dispatch = useAppDispatch()
  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )
  const operator = useTypedSelector(
    (state) => state.EditCreateTransaction.Calculator.operator,
  )

  const CalcQuantity = useCallback(() => {
    dispatch(calcCalculatorQuantity())
  }, [])

  const { middleBtns, rightBtns, leftColumnBtns } = useGetCalculatorGridBtns()

  return (
    <CalculatorLayout>
      <div className="left-grid">
        {leftColumnBtns.map(({ children, OnClick }, index) => (
          <OperationBtn key={index} OnClick={OnClick}>
            {children}
          </OperationBtn>
        ))}
      </div>
      <div className="middle-grid">
        {middleBtns.map(({ children, OnClick }, index) => (
          <DigitBtn key={index} OnClick={OnClick}>
            {children}
          </DigitBtn>
        ))}
      </div>
      <div className="right-grid">
        {rightBtns.map(({ children, OnClick }, index) => (
          <OperationBtn key={index} OnClick={OnClick}>
            {children}
          </OperationBtn>
        ))}
        {operator ? (
          <SubmitBtn bgColor={color} OnClick={CalcQuantity}>
            =
          </SubmitBtn>
        ) : (
          children
        )}
      </div>
    </CalculatorLayout>
  )
})
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

  .right-grid,
  .left-grid {
    flex: 1 1 min-content;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 62px);
  }
`
