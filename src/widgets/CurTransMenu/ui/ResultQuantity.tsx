import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import { MathOperatorSign, setMenuType } from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"


interface props {
  // quantity: number | string
  type: TransactionType
  color: string
}

export const ResultQuantity: FC<props> = ({ type, color }) => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(state => state.CurTransaction.editMenuType)

  const quantity = useTypedSelector(state => state.CurTransaction.quantity)
  const numberStr1 = useTypedSelector(state => state.CurTransaction.numberStr1)
  const numberStr2 = useTypedSelector(state => state.CurTransaction.numberStr2)
  const operator = useTypedSelector(state => state.CurTransaction.operator)


  let quantityStr: string
  if (!numberStr1) quantityStr = "" + quantity
  else
    quantityStr = operator ? numberStr1 + " " + MathOperatorSign.get(operator) + " " + numberStr2 : numberStr1

  const OnClick = () => {
    if (menuType === "overview")
      dispatch(setMenuType("edit"))
  }

  return <QuantityLayout onClick={OnClick} $color={color}>
    <p className="type">{type}</p>
    <p className="quantity">$ {quantityStr || "0"}</p>
  </QuantityLayout>
}
const QuantityLayout = styled.div<{
  $color?: string
}>`
  cursor: pointer;
  background-color: var(--bg-1);
  height: 75px;
  display: flex;
  gap: 9px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--bg-10);

  .type, .quantity {
    color: ${({ $color }) => $color || "var(--txt-3)"};
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