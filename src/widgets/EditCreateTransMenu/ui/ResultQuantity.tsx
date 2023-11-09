import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { MathOperatorSign } from "@entities/EditCreateTransaction/helpers/CalcMathOperation.ts"
import { setEditCreateMenuType } from "@entities/Modals/model/ModalsSlice.ts"
import { number } from "yup"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"


interface props {
  type: TransactionType
  // color: string
}

export const ResultQuantity: FC<props> = ({ type }) => {
  const dispatch = useAppDispatch()


  const categoryColor = useTypedSelector(state => state.EditCreateTransaction.ChosenCategory.color)
  const account = useTypedSelector(state => state.EditCreateTransaction.ChosenAccount)

  const menuType = useTypedSelector(state => state.Modals.editCreateTransMenu.menuType)
  const currency = useTypedSelector(state => state.EditCreateTransaction.Transaction.currency)

  const quantity = useTypedSelector(state => state.EditCreateTransaction.Calculator.quantity)
  let numberStr1 = useTypedSelector(state => state.EditCreateTransaction.Calculator.numberStr1)
  let numberStr2 = useTypedSelector(state => state.EditCreateTransaction.Calculator.numberStr2)
  const operator = useTypedSelector(state => state.EditCreateTransaction.Calculator.operator)


  const { convertCurrency } = useCurrencyConverter()

  if (numberStr1.startsWith(".")) numberStr1 = "0" + numberStr1
  if (numberStr2.startsWith(".")) numberStr2 = "0" + numberStr2

  let quantityStr: string
  if (!numberStr1 || menuType === "overview") quantityStr = "" + quantity
  else {
    if (operator)
      quantityStr = numberStr1 + " " + MathOperatorSign.get(operator) + " " + numberStr2
    else quantityStr = numberStr1
  }


  const OnClick = () => {
    if (menuType === "overview")
      dispatch(setEditCreateMenuType("edit"))
  }


  const rightCell = {
    color: categoryColor,
    bgColor: categoryColor
  }
  const leftCell = {
    color: account.color
  }

  const GetConvertedCurrency = () => {
    return RoundDecimal(convertCurrency(+quantityStr ? +quantityStr : +numberStr1, currency, account.currency), 2)
  }

  return <QuantityLayout onClick={OnClick} $leftCell={leftCell} $rightCell={rightCell}>
    {currency !== account.currency &&
      <div className="cell left">
        <p className="type">{type}</p>
        <p
          className="quantity">{DefaultCurrencySigns.get(account.currency)} {GetConvertedCurrency() || "0"}</p>
        <div className="colorFilter" />
      </div>
    }
    <div className="cell right">
      <p className="type">{type}</p>
      <p className="quantity">{DefaultCurrencySigns.get(currency)} {quantityStr || "0"}</p>
      <div className="colorFilter" />
    </div>
  </QuantityLayout>
}
const QuantityLayout = styled.div<{
  $rightCell?: {
    color: string
    bgColor: string
  },
  $leftCell?: {
    color: string
  }
}>`
  cursor: pointer;
  background-color: var(--bg-1);
  height: 75px;
  display: flex;
  border-bottom: 1px solid var(--bg-10);

  .cell {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 9px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .right {
    position: relative;

    .colorFilter {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.15;
      background-color: ${({ $rightCell }) => $rightCell?.bgColor || "white"} !important;
    }

    .type, .quantity {
      color: ${({ $rightCell }) => $rightCell?.color || "white"} !important;
    }
  }

  .left {
    .type, .quantity {
      color: ${({ $leftCell }) => $leftCell?.color || "var(--txt-3)"};
    }
  }

  .type, .quantity {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .type {
    font-size: 11px;
  }

  .quantity {
    font-size: 25px;
  }
`