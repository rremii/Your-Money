import styled from "styled-components"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import React, { FC } from "react"


interface props {
  dateFrom: Date
  dateTo: Date

}

export const TransactionHeader: FC<props> = React.memo(({ dateFrom, dateTo }) => {

  const allAccounts = useTypedSelector(state => state.Account.curAccBalance)

  // const { startBalance, endBalance } = GetAccBalanceByTimeGap({ allAccounts, curAccHistory, dateTo, dateFrom })

  return <TransactionsHeaderLayout>
    <div className="balance-cell">
      <h2>Starting balance</h2>
      <p>-Br {0}</p>
    </div>
    <div className="balance-cell">
      <h2>Ending balance</h2>
      <p>-Br {0}</p>
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
      color: var(--txt-8);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`