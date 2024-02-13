import styled from "styled-components"
import React, { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  right: React.ReactNode
}

export const TopHeader: FC<props> = ({ right }) => {
  const balance = useTypedSelector((state) => state.CurAccount.balance)

  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const currencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )

  return (
    <TopHeaderLayout>
      <div className="info center">
        <p>All accounts</p>
        <p>
          {FormatCurrencyString({
            currencySign,
            quantity: balance,
            formatString: currencyFormat,
            sign: balance < 0 ? "-" : "",
          })}
        </p>
      </div>
      <div className="right">{right}</div>
    </TopHeaderLayout>
  )
}
const TopHeaderLayout = styled.div`
  padding: 0 17px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 65px;
  align-items: center;
  display: grid;

  .info {
    grid-column: 2/3;
    justify-self: center;

    p:nth-child(1) {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    p:nth-child(2) {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .right {
    grid-column: 3/4;
    width: 20px;
    height: 20px;
    justify-self: right;
  }

  .right * {
    width: 100%;
    height: 100%;
  }
`
