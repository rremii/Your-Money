import styled from "styled-components"
import React, { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  startBalance: number
  endBalance: number
}

const GetNumberSignStyle = (num: number) => {
  if (num > 0) return "positive"
  if (num < 0) return "negative"
  return "zero"
}

export const TransactionHeader: FC<props> = React.memo(
  ({ startBalance, endBalance }) => {
    const curCurrencySign = useTypedSelector(
      (state) => state.Settings.curCurrencySign,
    )
    const currencyFormat = useTypedSelector(
      (state) => state.Settings.currencyFormat,
    )

    return (
      <TransactionsHeaderLayout>
        <div className="balance-cell">
          <h2>Starting balance</h2>
          <p className={GetNumberSignStyle(startBalance)}>
            {FormatCurrencyString({
              currencySign: curCurrencySign,
              quantity: startBalance,
              formatString: currencyFormat,
              sign: startBalance < 0 ? "-" : "",
            })}
          </p>
        </div>
        <div className="balance-cell">
          <h2>Ending balance</h2>
          <p className={GetNumberSignStyle(endBalance)}>
            {FormatCurrencyString({
              currencySign: curCurrencySign,
              quantity: endBalance,
              formatString: currencyFormat,
              sign: endBalance < 0 ? "-" : "",
            })}
          </p>
        </div>
      </TransactionsHeaderLayout>
    )
  },
)
const TransactionsHeaderLayout = styled.header`
  width: 100%;
  height: 55px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: center;
  position: relative;
  background-color: var(--sub-bg);

  box-shadow: 0px 2px 4px 0px #00000019;
  border-left: solid 1px rgba(109, 108, 108, 0.24);
  border-right: solid 1px rgba(109, 108, 108, 0.24);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 1px;
    background-color: rgba(109, 108, 108, 0.3);
  }

  .zero {
    color: var(--main-txt);
  }

  .negative {
    color: #e25e76;
  }

  .positive {
    color: #0bad7b;
  }

  .balance-cell {
    h2 {
      color: var(--sub-txt);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    p {
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
