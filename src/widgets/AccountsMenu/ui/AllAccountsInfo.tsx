import styled from "styled-components"
import { FC } from "react"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  allBalance: number
  currencyFormat: string
  currencySign: string
}

export const AllAccountsInfo: FC<props> = ({
  allBalance,
  currencySign,
  currencyFormat,
}) => {
  const getBalanceStyleClass = (): string => {
    if (allBalance < 0) return "neg-balance"
    if (allBalance > 0) return "pos-balance"
    return ""
  }
  return (
    <AccountsInfoLayout>
      <div className="accounts-top-info">
        <h2 className="title">ACCOUNTS</h2>
        <p className={`balance ${getBalanceStyleClass()}`}>
          {FormatCurrencyString({
            formatString: currencyFormat,
            currencySign,
            sign: "",
            quantity: allBalance,
          })}
        </p>
      </div>
    </AccountsInfoLayout>
  )
}
const AccountsInfoLayout = styled.div`
  .accounts-top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    padding: 0 15px;

    .title {
      color: var(--main-txt);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .neg-balance {
      color: #e25e76 !important;
    }

    .pos-balance {
      color: #0bad7b !important;
    }

    .balance {
      color: var(--sub-txt);
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
