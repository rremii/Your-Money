import styled from "styled-components"
import React, { FC, ReactNode } from "react"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

//todo check seo
interface props {
  iconNode: ReactNode
  name: string
  balance: number
  currencySign?: string
  OnClick?: () => void
  bgColor?: string
  color?: string
}

export const Account: FC<props> = ({
  name,
  balance,
  iconNode,
  OnClick,
  bgColor,
  color,
  currencySign,
}) => {
  const getBalanceStyleClass = (): string => {
    if (balance < 0) return "neg-balance"
    if (balance > 0) return "pos-balance"
    return ""
  }
  return (
    <AccountLayout
      onClick={OnClick}
      $bgColor={bgColor}
      $quantityColor={color}
      $nameColor={color}
      className="Account"
    >
      {iconNode}
      <div className="accounts-info">
        <p className="name">{name}</p>
        <p className={`balance ${getBalanceStyleClass()}`}>
          <span>
            {balance < 0 ? "-" : ""}
            {currencySign || "$"}
          </span>
          {Math.abs(RoundDecimal(balance, 2))}
        </p>
      </div>
    </AccountLayout>
  )
}
const AccountLayout = styled.div<{
  $bgColor?: string
  $nameColor?: string
  $quantityColor?: string
}>`
  height: 55px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 13px;
  //background-color: ${({ $bgColor }) =>
    $bgColor ? $bgColor : "var(--bg-1)"};
  background-color: var(--bg-1);
  cursor: pointer;

  .icon {
    width: 37px;
    height: 32px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .accounts-info {
    flex: 1 1 auto;
    height: 100%;
    border-bottom: 1px solid var(--separator-2);
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      // color: ${({ $nameColor }) =>
        $nameColor ? $nameColor : "var(--txt-5)"};
      color: var(--txt-5);
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 3px;
    }

    .neg-balance {
      color: var(--txt-8) !important;
    }

    .pos-balance {
      color: var(--txt-10) !important;
    }

    .balance {
      color: var(--txt-6);
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      span {
        font-family: Inter;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-right: 3px;
      }
    }
  }
`
