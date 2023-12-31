import styled from "styled-components"
import { FC } from "react"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

interface props {
  currencySign: string
  allBalance: number
}


export const AllAccountsInfo: FC<props> = ({ currencySign, allBalance }) => {


  const getBalanceStyleClass = (): string => {
    if (allBalance < 0) return "neg-balance"
    if (allBalance > 0) return "pos-balance"
    return ""
  }
  return <AccountsInfoLayout>
    <div className="accounts-top-info">
      <h2 className="title">ACCOUNTS</h2>
      <p className={`balance ${getBalanceStyleClass()}`}><span>{currencySign}</span> {RoundDecimal(allBalance, 2)}</p>
    </div>
  </AccountsInfoLayout>
}
const AccountsInfoLayout = styled.div`
  .accounts-top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    padding: 0 15px;

    .title {
      color: var(--txt-2);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .neg-balance {
      color: var(--txt-8) !important;
    }

    .pos-balance {
      color: var(--txt-10) !important;
    }

    .balance {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      span {
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-size: 14px;
      }
    }

  }
`