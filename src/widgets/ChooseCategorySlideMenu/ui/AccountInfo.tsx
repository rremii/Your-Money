import styled from "styled-components"
import { AccountsIcons } from "@shared/constants/AccountsIcons.ts"
import { FC, memo } from "react"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

interface props {
  name: string
  icon: string
  balance: number
  color: string
  currencySign: string
}

export const AccountInfo: FC<props> = memo(({ balance, name, icon, currencySign, color }) => {


  return <AccountInfoLayout $color={color}>
    <div className="name-box">
      <img src={AccountsIcons.get(icon)} alt="account icon" className="icon" />
      <p className="name">{name}</p>
    </div>
    <div className="balance-box">
      <p className="title">Account balance</p>
      <div className="balance">{balance < 0 ? "-" : ""}{currencySign} {Math.abs(RoundDecimal(balance, 2))}</div>
    </div>
  </AccountInfoLayout>
})
const AccountInfoLayout = styled.div<{
  $color?: string
}>`

  height: 115px;
  border-radius: 5px 5px 0 0;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ $color }) => $color || "var(--account-color)"};
  width: 95%;

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;

  .name-box {
    display: flex;
    gap: 20px;

    .icon {
      width: 20px;
      height: 20px;
    }

    .name {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

    }
  }

  .balance-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      margin-bottom: 5px;
      color: var(--txt-1);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.36px;
    }

    .balance {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

`