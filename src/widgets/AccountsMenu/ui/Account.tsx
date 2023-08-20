import styled from "styled-components"
import AccountIcon from "@shared/assets/LightTheme/accounts.png"
import { FC } from "react"

//todo check seo

interface props {
  icon: string
  name: string
  quantity: number
}


export const Account: FC<props> = ({ name, quantity, icon }) => {


  return <AccountLayout className="Account">
    <div className="icon">
      <img src={icon} alt="account icon" />
    </div>
    <div className="accounts-info">
      <p className="name">{name}</p>
      <p className="quantity"><span>-$</span> {Math.abs(quantity)}</p>
    </div>
  </AccountLayout>
}
const AccountLayout = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 13px;

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
      color: var(--txt-5);
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 3px;
    }

    .quantity {
      color: var(--txt-8);
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