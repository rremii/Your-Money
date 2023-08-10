import styled from "styled-components"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import React from "react"
import { DateMoneyCell } from "@widgets/OverviewMenu/ui/DateMoneyCell.tsx"
import { CategoryCell } from "@widgets/OverviewMenu/ui/CategoryCell.tsx"

export const OverviewMenu = () => {
  return <MenuLayout>
    <div className="balance">
      <h2>Balance</h2>
      <p>-Br 100</p>
    </div>
    <div className="balance-info">
      <div className="expense">
        <h2>Expense</h2>
        <p>-Br 100</p>
      </div>
      <div className="income">
        <h2>Income</h2>
        <p>Br 100</p>
      </div>
    </div>
    <div className="overview-graph">

    </div>
    <div className="date-money-box">
      <DateMoneyCell />
      <DateMoneyCell />
      <DateMoneyCell />

    </div>
    <div className="categories-box">
      <CategoryCell />
      <CategoryCell />
      <CategoryCell />
      <CategoryCell />
      <CategoryCell />
    </div>


  </MenuLayout>
}
const MenuLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  overflow-y: auto;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;
  padding-bottom: 15px;

  .categories-box {
    width: 100%;
    display: flex;
    flex-direction: column;


  }

  .date-money-box {
    background-color: var(--bg-1);

    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }


  .overview-graph {
    width: 100%;
    background-color: var(--bg-1);
    height: 145px;
  }

  .balance {
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
      font-size: 11px;
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

  .balance-info {
    width: 100%;
    display: flex;
    height: 50px;

    .expense, .income {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      h2 {
        font-family: Inter;
        font-size: 11px;
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
  }

`