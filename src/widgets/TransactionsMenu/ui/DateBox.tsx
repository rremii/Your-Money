import styled from "styled-components"
import React, { FC } from "react"
import { TransformDate } from "@entities/Transaction/helpers/TransformDate.ts"

interface props {
  date: Date
  dateBalance: number
}


export const DateBox: FC<props> = ({ date: curDate, dateBalance }) => {

  const { isToday, month, year, date, day } = TransformDate(curDate)

  return <DateBoxLayout $isToday={isToday}>
    <p className="date">{date.toUpperCase()}</p>
    <div className="other-info">
      <p className="day">{day.toUpperCase()}</p>
      <p className="month-year">{month?.toUpperCase()} {year}</p>
    </div>
    <div className="quantity">
      {dateBalance < 0 ? "-" : ""}Br {Math.abs(dateBalance)}
    </div>
  </DateBoxLayout>
}
const DateBoxLayout = styled.div<{
  $isToday?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  padding: 7px 13px;
  gap: 7px;
  //background-color: white !important;

  .date {
    color: ${({ $isToday }) => $isToday ? "var(--txt-3)" : "var(--txt-6)"};
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
      color: ${({ $isToday }) => $isToday ? "var(--txt-4)" : "var(--txt-10)"};
      font-family: Inter;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .month-year {
      color: ${({ $isToday }) => $isToday ? "var(--txt-3)" : "var(--txt-6)"};
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .quantity {
    color: var(--txt-8);
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }


`