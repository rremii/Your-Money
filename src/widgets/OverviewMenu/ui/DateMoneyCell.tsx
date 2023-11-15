import styled from "styled-components"
import React, { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

interface props {
  title: string
  quantity: number
  currencySign: string
}

export const DateMoneyCell: FC<props> = React.memo(({ quantity, title, currencySign }) => {


  return <CellLayout>
    <h3 className="date">{title}</h3>
    <p className="quantity">{quantity !== 0 ? "-" : ""}{currencySign} {Math.abs(RoundDecimal(quantity, 2))}</p>
  </CellLayout>
})
const CellLayout = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-8);
  height: 46px;
  border: 1px solid var(--bg-2);
  gap: 3px;

  .date {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .quantity {
    color: var(--txt-8);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`