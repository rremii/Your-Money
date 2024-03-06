import styled from "styled-components"
import React, { FC } from "react"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"
import { useTranslation } from "react-i18next"

interface props {
  expense: number
  income: number
  currencySign: string
  formatStr: string
}

export const BalanceBox: FC<props> = React.memo(
  ({ income, expense, currencySign, formatStr }) => {
    const balance = income + expense

    const { t } = useTranslation()

    let balanceSign: "" | "+" | "-" = ""
    if (balance > 0) balanceSign = "+"
    if (balance < 0) balanceSign = "-"
    return (
      <BalanceLayout $balance={balance}>
        <div className="balance">
          <h2>{t("general.balance")}</h2>
          <p>
            {FormatCurrencyString({
              currencySign,
              quantity: balance,
              formatString: formatStr,
              sign: balanceSign,
            })}
          </p>
        </div>
        <div className="expense">
          <h2>{t("general.expense")}</h2>
          <p>
            {FormatCurrencyString({
              currencySign,
              quantity: expense,
              formatString: formatStr,
              sign: expense ? "-" : "",
            })}
          </p>
        </div>
        <div className="income">
          <h2>{t("general.income")}</h2>
          <p>
            {FormatCurrencyString({
              currencySign,
              quantity: income,
              formatString: formatStr,
              sign: income ? "+" : "",
            })}
          </p>
        </div>
      </BalanceLayout>
    )
  },
)
const BalanceLayout = styled.div<{
  $balance?: number
}>`
  display: grid;
  grid-template-rows: 55px 50px;
  grid-template-columns: 1fr 1fr;

  .balance {
    grid-column: span 2;
    background-color: var(--sub-bg);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2px;
    height: 57px;

    h2 {
      color: var(--sub-txt);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    p {
      color: ${({ $balance }) => {
        let color = "#818181"
        if ($balance && $balance > 0) color = "#0BAD7B"
        if ($balance && $balance < 0) color = "#E25E76"
        return color
      }};
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .expense,
  .income {
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
    background-color: #ed5564;

    h2,
    p {
      color: #ffffff;
    }
  }

  .income {
    width: 100%;
    height: 100%;
    background: var(--sub-bg);
    position: relative;

    h2 {
      color: var(--sub-txt);
    }

    p {
      color: #0bad7b;
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(76, 176, 80, 0.15);
    }
  }
`
