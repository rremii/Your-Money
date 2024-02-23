import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { MathOperatorSign } from "@entities/EditCreateTransaction/helpers/CalcMathOperation.ts"
import { setEditCreateMenuType } from "@entities/UI/model/ModalsSlice.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { useGetConvertedTransCurrency } from "@entities/Transaction/model/useGetConvertedTransCurrency.tsx"

export const ResultQuantity = () => {
  const dispatch = useAppDispatch()
  const type = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.type,
  )
  const currency = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.currency,
  )
  const categoryColor = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )
  const account = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenAccount,
  )

  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.menuType,
  )
  const { quantity, operator } = useTypedSelector(
    (state) => state.EditCreateTransaction.Calculator,
  )
  let { numberStr1, numberStr2 } = useTypedSelector(
    (state) => state.EditCreateTransaction.Calculator,
  )

  const { GetConvertedCurrency } = useGetConvertedTransCurrency()

  if (numberStr1.startsWith(".")) numberStr1 = "0" + numberStr1
  if (numberStr2.startsWith(".")) numberStr2 = "0" + numberStr2

  let quantityStr: string
  if (!numberStr1 || menuType === "overview") quantityStr = "" + quantity
  else {
    if (operator)
      quantityStr =
        numberStr1 + " " + MathOperatorSign.get(operator) + " " + numberStr2
    else quantityStr = numberStr1
  }

  const OnClick = () => {
    if (menuType === "overview") dispatch(setEditCreateMenuType("edit"))
  }

  const rightCell = {
    color: categoryColor,
    bgColor: categoryColor,
  }
  const leftCell = {
    color: account.color,
  }

  return (
    <QuantityLayout
      onClick={OnClick}
      $leftCell={leftCell}
      $rightCell={rightCell}
    >
      {currency !== account.currency && (
        <div className="cell left">
          <p className="type">{type}</p>
          <p className="quantity">
            {DefaultCurrencySigns.get(account.currency)}{" "}
            {GetConvertedCurrency() || "0"}
          </p>
          <div className="colorFilter" />
        </div>
      )}
      <div className="cell right">
        <p className="type">{type}</p>
        <p className="quantity">
          {DefaultCurrencySigns.get(currency)} {quantityStr || "0"}
        </p>
        <div className="colorFilter" />
      </div>
    </QuantityLayout>
  )
}
const QuantityLayout = styled.div<{
  $rightCell?: {
    color: string
    bgColor: string
  }
  $leftCell?: {
    color: string
  }
}>`
  cursor: pointer;
  background-color: var(--sub-bg);
  height: 75px;
  display: flex;
  border-bottom: 1px solid rgba(163, 162, 162, 0.13);

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
      background-color: ${({ $rightCell }) =>
        $rightCell?.bgColor || "white"} !important;
    }

    .type,
    .quantity {
      color: ${({ $rightCell }) => $rightCell?.color || "white"} !important;
    }
  }

  .left {
    .type,
    .quantity {
      color: ${({ $leftCell }) => $leftCell?.color || "var(--txt-3)"};
    }
  }

  .type,
  .quantity {
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
