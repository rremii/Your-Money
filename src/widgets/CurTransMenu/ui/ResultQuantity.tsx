import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"


interface props {
  quantity: number | string
  type: TransactionType
  color: string
}

export const ResultQuantity: FC<props> = ({ quantity, type, color }) => {


  return <QuantityLayout $color={color}>
    <p className="type">{type}</p>
    <p className="quantity">$ {quantity}</p>
  </QuantityLayout>
}
const QuantityLayout = styled.div<{
  $color?: string
}>`

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