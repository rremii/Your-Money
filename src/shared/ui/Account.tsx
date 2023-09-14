import styled from "styled-components"
import { FC } from "react"
import { AccountsIcons } from "@shared/constants/AccountsIcons.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

//todo check seo
interface props {
  icon: string
  name: string
  quantity: number
  OnClick?: () => void
  bgColor?: string
  color?: string
}


export const Account: FC<props> = ({ name, quantity, icon, OnClick, bgColor, color }) => {


  return <AccountLayout onClick={OnClick} $bgColor={bgColor} $quantityColor={color} $nameColor={color}
                        className="Account">
    <div className="icon">
      <img src={AccountsIcons.get(icon)} alt="account icon" />
    </div>
    <div className="accounts-info">
      <p className="name">{name}</p>
      <p className="quantity"><span>-$</span> {Math.abs(quantity)}</p>
    </div>
  </AccountLayout>
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
  background-color: ${({ $bgColor }) => $bgColor ? $bgColor : "var(--bg-1)"};
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
      color: ${({ $nameColor }) => $nameColor ? $nameColor : "var(--txt-5)"};
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 3px;
    }

    .quantity {
      color: ${({ $quantityColor }) => $quantityColor ? $quantityColor : "var(--txt-8)"};
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
      }
    }
  }
`