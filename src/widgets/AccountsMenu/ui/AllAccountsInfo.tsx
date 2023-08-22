import styled from "styled-components"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { getCurBalance } from "@entities/Account/model/AccountSlice.ts"

export const AllAccountsInfo = () => {


  const balance = useTypedSelector(getCurBalance)


  return <AccountsInfoLayout>
    <div className="accounts-top-info">
      <h2 className="title">ACCOUNTS</h2>
      <p className="quantity"><span>$</span> {balance}</p>
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

    .quantity {
      color: var(--txt-10);
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