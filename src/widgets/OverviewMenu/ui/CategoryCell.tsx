import styled from "styled-components"
import React, { FC } from "react"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  name: string
  quantity: number
  percent: number
  color: string
  currencySign: string
  formatStr: string
  icon: string
}

export const CategoryCell: FC<props> = React.memo(
  ({ icon, percent, quantity, name, color, currencySign, formatStr }) => {
    return (
      <CellLayout $color={color} $percent={percent * 100}>
        <CustomIcon boxSize="35px" icon={icon} boxColor={color} />
        <div className="text-info">
          <h2 className="name">{name}</h2>
          <p className="quantity">
            {FormatCurrencyString({
              currencySign,
              quantity: quantity,
              formatString: formatStr,
              sign: quantity < 0 ? "-" : ""
            })}
          </p>
        </div>
        <div className="percent-bar">
          <div className="bar" />
          <div className="filled-bar" />
          <div className="percent">{Math.round(percent * 100)}%</div>
        </div>
      </CellLayout>
    )
  }
)
const CellLayout = styled.div<{
  $color?: string
  $percent?: number
}>`
    box-shadow: 0px 2px 4px 0px #00000019;
    padding: 7px 15px;
    height: 52px;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: repeat(2, min-content);
    column-gap: 10px;
    row-gap: 2px;
    background-color: var(--sub-bg);

    .CustomIcon {
        grid-row: span 2;
    }

    .text-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
            color: var(--sub-txt);
            font-family: Inter;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .quantity {
            color: var(--main-txt);
            font-family: Inter;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    .percent-bar {
        width: 100%;

        position: relative;
        height: 5px;
        display: flex;
        align-items: center;

        .bar {
            position: absolute;
            left: 0;
            top: 0;
            background-color: #d9d9d9;
            height: 5px;
            width: 100%;
        }

        .filled-bar {
            z-index: 1;
            height: 5px;
            background-color: ${({ $color }) => $color || "#4CB050"};
            width: ${({ $percent }) => $percent + "%"};
        }

        .percent {
            z-index: 1;
            padding: 0 7px;
            background-color: var(--sub-bg);
            color: ${({ $percent, $color }) => ($percent === 0 ? "#A9A9A9" : $color)};
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
`
