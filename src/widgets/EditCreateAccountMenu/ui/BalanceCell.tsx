import styled from "styled-components"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"

export const BalanceCell = () => {

  const balance = useTypedSelector(state => state.NewAccount.balance)
  const currency = useTypedSelector(state => state.NewAccount.currency)


  return <BalanceCellLayout>
    <h2 className="title">Account balance</h2>
    <p className="extra-info">{DefaultCurrencySigns.get(currency)} {balance || 0}</p>
  </BalanceCellLayout>
}
const BalanceCellLayout = styled.div`
  padding: 10px 15px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 5px 5px -5px var(--shadow-3);

  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: black;
    margin-bottom: 2px;
  }

  .extra-info {
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: rgb(163, 87, 96);
  }
`