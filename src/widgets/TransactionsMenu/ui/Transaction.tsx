import styled from "styled-components"
import Groceries from "@shared/assets/LightTheme/groceries.png"
import Account from "@shared/assets/LightTheme/accounts.png"
import React, { FC } from "react"
import { ITransaction } from "@entities/Transaction/model/useGetTransactions.tsx"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"

interface props extends ITransaction {

}

export const Transaction: FC<props> = ({ date, id, quantity, category }) => {

  return <TransactionLayout>
    <div className="icon">
      <img src={CategoriesIcons.get(category)} alt="transaction icon" />
    </div>
    <div className="info">
      <p className="category">{category}</p>
      <div className="account-info">
        <img src={Account} alt="account type" />
        <p>Card</p>
      </div>
    </div>
    <div className="quantity">
      -Br {quantity}
    </div>
  </TransactionLayout>
}
const TransactionLayout = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px;
  gap: 12px;
  height: 60px;
  background-color: var(--txt-1);
  box-shadow: 0px 2px 4px 0px var(--shadow-2);
  margin-bottom: 1px;

  .icon {
    img {
      width: 40px;
      height: 40px;
    }
  }

  .info {
    flex: 1 1 auto;

    .category {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 3px;
    }

    .account-info {
      display: flex;
      gap: 5px;
      align-items: baseline;

      img {
        width: 13px;
        height: 10px;
      }

      p {
        color: var(--txt-2);
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .quantity {
    align-self: flex-start;
    color: var(--txt-8);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`