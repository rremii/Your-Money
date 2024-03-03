import styled from "styled-components"
import React, { FC } from "react"
import { TransformDate } from "@widgets/TransactionsMenu/model/TransformDate.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  date: Date
  dateBalance: number
  currencySign: string
  formatStr: string
}

export const DateBox: FC<props> = ({
  date: curDate,
  dateBalance,
  formatStr,
  currencySign,
}) => {
  const { isToday, month, year, date, day } = TransformDate(curDate)

  let balanceSign: "" | "+" | "-" = ""
  if (dateBalance > 0) balanceSign = "+"
  if (dateBalance < 0) balanceSign = "-"
  return (
    <DateBoxLayout $balance={dateBalance} $isToday={isToday}>
      <p className="date">{date.toUpperCase()}</p>
      <div className="other-info">
        <p className="day">{day.toUpperCase()}</p>
        <p className="month-year">
          {month && month.toUpperCase()} {year}
        </p>
      </div>
      <div className="quantity">
        {FormatCurrencyString({
          currencySign,
          quantity: dateBalance,
          formatString: formatStr,
          sign: balanceSign,
        })}
      </div>
    </DateBoxLayout>
  )
}
const DateBoxLayout = styled.div<{
  $isToday?: boolean
  $balance?: number
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  padding: 7px 13px;
  gap: 7px;

  .date {
    color: ${({ $isToday }) => ($isToday ? "#5C6AC0" : "var(--main-txt)")};
    text-align: center;
    font-family: Inter;
    font-size: 23px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .other-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1 1 auto;

    .day {
      color: ${({ $isToday }) => ($isToday ? "#606ca6" : "var(--pale-txt)")};
      font-family: Inter;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .month-year {
      color: ${({ $isToday }) => ($isToday ? "#5C6AC0" : "var(--main-txt)")};
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .quantity {
    color: ${({ $balance }) =>
      $balance && $balance < 0 ? "#E25E76" : "#0BAD7B"};
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
