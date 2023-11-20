import styled from "styled-components"
import React, { FC } from "react"
import { CategoryIcon } from "@shared/ui/CustomIcon/CategoryIcon.tsx"

interface props {
  name: string
  quantity: number
  percent: number
  color: string
  currency: string
  icon: string
}


export const CategoryCell: FC<props> = React.memo(({ currency, icon, percent, quantity, name, color }) => {
  return <CellLayout $color={color} $percent={percent * 100}>
    <CategoryIcon boxSize="35px" category={icon} color={color} />
    <div className="text-info">
      <h2 className="name">{name}</h2>
      <p className="quantity">{currency} {quantity}</p>
    </div>
    <div className="percent-bar">
      <div className="bar" />
      <div className="filled-bar" />
      <div className="percent">{Math.round(percent * 100)}%</div>
    </div>
  </CellLayout>
})
const CellLayout = styled.div<{
  $color?: string
  $percent?: number
}>`
  box-shadow: 0px 2px 4px 0px var(--shadow-2);
  padding: 7px 15px;
  height: 52px;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: repeat(2, min-content);
  column-gap: 10px;
  row-gap: 2px;
  background-color: var(--bg-1);

  .CategoryIcon {
    grid-row: span 2;
  }

  .text-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .quantity {
      color: var(--txt-2);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .percent-bar {
    position: relative;
    height: 5px;
    display: flex;
    align-items: center;

    .bar {
      position: absolute;
      left: 0;
      top: 0;
      background-color: var(--bg-10);
      height: 5px;
      width: 100%;
    }

    .filled-bar {
      z-index: 1;
      height: 5px;
      background-color: ${({ $color }) => $color || "var(--bg-9)"};
      width: ${({ $percent }) => $percent + "%"};
    }

    .percent {
      z-index: 1;
      padding: 0 7px;
      background-color: var(--bg-1);
      color: ${({ $percent, $color }) => $percent === 0 ? "var(--txt-12)" : $color};
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`