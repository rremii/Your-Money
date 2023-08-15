import styled from "styled-components"
import React, { FC } from "react"

interface props {
  expense: number
  income: number
}

export const BalanceBox: FC<props> = ({ income, expense }) => {

  const balance = income - expense
  return <BalanceLayout>
    <div className="balance">
      <h2>Balance</h2>
      <p>-Br {balance}</p>
    </div>
    <div className="expense">
      <h2>Expense</h2>
      <p>-Br {expense}</p>
    </div>
    <div className="income">
      <h2>Income</h2>
      <p>Br {income}</p>
    </div>
  </BalanceLayout>
}
const BalanceLayout = styled.div`
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
      color: var(--txt-8);
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