import styled from "styled-components"
import React, { FC } from "react"


interface props {
  startBalance: number
  endBalance: number
}

const GetNumberSignStyle = (num: number) => {
  if (num > 0) return "positive"
  if (num < 0) return "negative"
  return "zero"
}

export const TransactionHeader: FC<props> = React.memo(({ startBalance, endBalance }) => {

  return <TransactionsHeaderLayout>
    <div className="balance-cell">
      <h2>Starting balance</h2>
      <p className={GetNumberSignStyle(startBalance)}>{startBalance < 0 ? "-" : ""}Br {startBalance}</p>
    </div>
    <div className="balance-cell">
      <h2>Ending balance</h2>
      <p className={GetNumberSignStyle(endBalance)}>{endBalance < 0 ? "-" : ""}Br {endBalance}</p>
    </div>
  </TransactionsHeaderLayout>
})
const TransactionsHeaderLayout = styled.header`
  width: 100%;
  height: 55px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: center;
  position: relative;
  background-color: var(--bg-1);

  box-shadow: 0px 2px 4px 0px var(--shadow-2);
  border-left: solid 1px var(--bg-5);
  border-right: solid 1px var(--bg-5);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 1px;
    background-color: var(--bg-5);
  }


  .zero {
    color: var(var(--txt-2));
  }

  .negative {
    color: var(--txt-8);
  }

  .positive {
    color: var(--txt-10);
  }

  .balance-cell {

    h2 {
      color: var(--txt-5);
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