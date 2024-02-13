import styled from "styled-components"
import { Doughnut } from "react-chartjs-2"
import React, { FC } from "react"
import { GetDoughnutConfig } from "@widgets/CategoriesMenu/model/GetDoughnutConfig.ts"
import {
  IConvertedTransaction,
  TransactionType,
} from "@entities/Transaction/types.ts"
import { SumAllTransactions } from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export interface ICategoryData {
  name: string
  quantity: number
  color: string
}

interface props {
  categories: ICategoryData[]
  incTransactions: IConvertedTransaction[]
  expTransactions: IConvertedTransaction[]
  menuType: TransactionType
  OnClick?: () => void
}

export const BalanceGraph: FC<props> = React.memo(
  ({ categories, incTransactions, expTransactions, menuType, OnClick }) => {
    const curCurrencySign = useTypedSelector(
      (state) => state.Settings.curCurrencySign,
    )
    const currencyFormat = useTypedSelector(
      (state) => state.Settings.currencyFormat,
    )

    const incTransactionsSum = SumAllTransactions(incTransactions)
    const expTransactionsSum = SumAllTransactions(expTransactions)

    const doughnutConfig = GetDoughnutConfig(categories)

    return (
      <GraphLayout onClick={OnClick}>
        <Doughnut {...doughnutConfig} />
        <div className="balance">
          <div className="type">
            {menuType === "expense" ? "Expense" : "Income"}
          </div>
          <div
            className={`${
              menuType === "expense" ? "current" : ""
            } quantity expenses`}
          >
            {FormatCurrencyString({
              currencySign: curCurrencySign,
              quantity: expTransactionsSum,
              formatString: currencyFormat,
              sign: expTransactionsSum < 0 ? "-" : "",
            })}
          </div>
          <div
            className={`${
              menuType === "income" ? "current" : ""
            } quantity income`}
          >
            {FormatCurrencyString({
              currencySign: curCurrencySign,
              quantity: incTransactionsSum,
              formatString: currencyFormat,
              sign: incTransactionsSum < 0 ? "-" : "",
            })}
          </div>
        </div>
      </GraphLayout>
    )
  },
)
const GraphLayout = styled.div`
  position: relative;
  grid-row: 2/4;
  grid-column: 2/4;
  height: min-content;
  border-radius: 50%;
  overflow: hidden;
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
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(calc(-20px - 50%));

      color: var(--txt-5);
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .quantity {
      width: max-content;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(10px);

      font-family: Inter, sans-serif !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      font-size: 13px;
    }

    .current {
      font-size: 16px;
      transform: translateX(-50%) translateY(-50%);
    }

    .income {
      color: var(--txt-9);
    }

    .expenses {
      color: var(--txt-8);
    }
  }
`
