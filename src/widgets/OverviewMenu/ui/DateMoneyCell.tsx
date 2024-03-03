import styled from "styled-components"
import React, { FC } from "react"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  title: string
  quantity: number
  currencySign: string
  formatStr: string
}

export const DateMoneyCell: FC<props> = React.memo(
  ({ quantity, title, currencySign, formatStr }) => {
    return (
      <CellLayout>
        <h3 className="date">{title}</h3>
        <p className="quantity">
          {FormatCurrencyString({
            currencySign,
            quantity: quantity,
            formatString: formatStr,
            sign: "",
          })}
        </p>
      </CellLayout>
    )
  },
)
const CellLayout = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--sub-bg);
  height: 46px;
  border: 1px solid rgba(84, 84, 84, 0.4);
  gap: 3px;
  position: relative;

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 0, 0, 0.03);
  }

  .date {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .quantity {
    color: #e25e76;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
