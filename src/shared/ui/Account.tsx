import styled from "styled-components"
import React, { FC, ReactNode } from "react"

//todo check seo
interface props {
  iconNode: ReactNode
  name: string
  formattedStr: string
  balance: number
  currencySign?: string
  OnClick?: () => void
  bgColor?: string
  color?: string
}

export const Account: FC<props> = ({
  name,
  formattedStr,
  balance,
  iconNode,
  OnClick,
  bgColor,
  color,
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
        <p className={`balance ${getBalanceStyleClass()}`}>{formattedStr}</p>
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
  background-color: ${({ $bgColor }) => $bgColor || "var(--sub-bg)"};
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
      color: ${({ $nameColor }) => $nameColor || "var(--sub-txt)"};
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 3px;
    }

    .balance {
      color: ${({ $quantityColor }) =>
        $quantityColor ? $quantityColor + " !important" : "var(--main-txt)"};
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .neg-balance {
      color: var(--txt-8);
    }

    .pos-balance {
      color: var(--txt-10);
    }
  }
`
