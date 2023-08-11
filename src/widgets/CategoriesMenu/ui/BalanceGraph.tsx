import styled from "styled-components"
import { Doughnut } from "react-chartjs-2"
import React, { FC } from "react"
import { ITransaction, TransCategories } from "@entities/Transaction/types.ts"
import { GetDoughnutConfig } from "@entities/Transaction/helpers/GetDoughnutConfig.ts"

export interface ICategoryData {
  name: TransCategories
  quantity: number
  color: string
}

interface props {
  categories: ICategoryData[]
}

export const BalanceGraph: FC<props> = ({ categories }) => {


  const doughnutConfig = GetDoughnutConfig(categories)


  return <GraphLayout>
    <Doughnut {...doughnutConfig} />
    <div className="balance">
      <div className="type">Expenses</div>
      <div className="current expenses">Br <span>5</span></div>
      <div className="sub income">Br <span>0</span></div>
    </div>
  </GraphLayout>
}
const GraphLayout = styled.div`
  position: relative;
  grid-row: 2/4;
  grid-column: 2/4;
  height: min-content;

  cursor: pointer;

  .balance {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .type {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .current, .sub {
      font-family: Inter;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .current {
      font-size: 16px;

      span {
        font-size: 19px;
      }
    }

    .sub {
      font-size: 13px;

      span {
        font-size: 16px;
      }
    }

    .income {
      color: var(--txt-8);
    }

    .expenses {
      color: var(--txt-9);
    }
  }

`