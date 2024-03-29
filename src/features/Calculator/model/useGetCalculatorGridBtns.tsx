import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  addToNum,
  removeLastNumber,
  setOperator
} from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { MathOperatorType } from "@entities/EditCreateTransaction/helpers/CalcMathOperation.ts"
import React, { useCallback, useMemo } from "react"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import BackspaceIcon from "@icons/general/backspace.svg?react"
import DateIcon from "@icons/general/event.svg?react"

interface ICalculatorBtn {
  OnClick: () => void
  children: React.ReactNode | string
}

export const useGetCalculatorGridBtns = () => {
  const dispatch = useAppDispatch()

  const currency = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.currency
  )

  const OpenDateMenu = useCallback(() => {
    dispatch(openMenu("dateMenu"))
  }, [])

  const RemoveLastNum = useCallback(() => {
    dispatch(removeLastNumber())
  }, [])

  const AddToNum = useCallback((num: number | string) => {
    dispatch(addToNum(num))
  }, [])

  const SetOperator = useCallback((operator: MathOperatorType) => {
    dispatch(setOperator(operator))
  }, [])

  const OpenCurrencyMenu = useCallback(() => {
    dispatch(openMenu("editCreateCurrencyMenu"))
  }, [])

  const leftColumnBtns: ICalculatorBtn[] = useMemo(
    () => [
      { OnClick: () => SetOperator("div"), children: "÷" },
      { OnClick: () => SetOperator("mul"), children: "×" },
      { OnClick: () => SetOperator("sub"), children: "-" },
      { OnClick: () => SetOperator("sum"), children: "+" }
    ],
    []
  )
  const middleBtns: ICalculatorBtn[] = useMemo(
    () => [
      { OnClick: () => AddToNum(7), children: "7" },
      { OnClick: () => AddToNum(8), children: "8" },
      { OnClick: () => AddToNum(9), children: "9" },
      { OnClick: () => AddToNum(4), children: "4" },
      { OnClick: () => AddToNum(5), children: "5" },
      { OnClick: () => AddToNum(6), children: "6" },
      { OnClick: () => AddToNum(1), children: "1" },
      { OnClick: () => AddToNum(2), children: "2" },
      { OnClick: () => AddToNum(3), children: "3" },
      {
        OnClick: OpenCurrencyMenu,
        children: DefaultCurrencySigns.get(currency)
      },
      { OnClick: () => AddToNum(0), children: "0" },
      { OnClick: () => AddToNum("."), children: "." }
    ],
    [currency]
  )

  const rightBtns: ICalculatorBtn[] = useMemo(
    () => [
      { OnClick: RemoveLastNum, children: <BackspaceIcon /> },
      { OnClick: OpenDateMenu, children: <DateIcon /> }
    ],
    []
  )

  return {
    leftColumnBtns,
    middleBtns,
    rightBtns
  }
}
