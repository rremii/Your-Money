import styled from "styled-components"
import React, { FC } from "react"

interface props {
  expense: number
  income: number
}

export const BalanceBox: FC<props> = React.memo(({ income, expense }) => {


  const balance = income + expense

  let balanceSign = ""
  if (balance > 0) balanceSign = "+"
  if (balance < 0) balanceSign = "-"
  return <BalanceLayout $balance={balance}>
    <div className="balance">
      <h2>Balance</h2>
      <p>{balanceSign}Br {Math.abs(balance)}</p>
    </div>
    <div className="expense">
      <h2>Expense</h2>
      <p>{expense ? "-" : ""}Br {Math.abs(expense)}</p>
    </div>
    <div className="income">
      <h2>Income</h2>
      <p>{income ? "+" : ""}Br {income}</p>
    </div>
  </BalanceLayout>
})
const BalanceLayout = styled.div<{
  $balance?: number
}>`
  display: grid;
  grid-template-rows: 55px 50px;
  grid-template-columns: 1fr 1fr;

  .balance {
    grid-column: span 2;
    background-color: var(--bg-1);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2px;
    height: 57px;

    h2 {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    p {
      color: ${({ $balance }) => {
        let color = "var(--txt-6)"
        if ($balance && $balance > 0) color = "var(--txt-10)"
        if ($balance && $balance < 0) color = "var(--txt-8)"
        return color
      }};
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }


  .expense, .income {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    p {
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .expense {
    width: 100%;
    height: 100%;
    background-color: var(--bg-6);

    h2, p {
      color: var(--txt-1);
    }

  }

  .income {
    width: 100%;
    height: 100%;
    background-color: var(--bg-7);

    h2 {
      color: var(--txt-5);
    }

    p {

      color: var(--txt-10);
    }

  }
`