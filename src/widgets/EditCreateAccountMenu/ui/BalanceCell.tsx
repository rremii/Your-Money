import styled from "styled-components"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

export const BalanceCell = () => {
  const balance = useTypedSelector((state) => state.NewAccount.balance)
  const currency = useTypedSelector((state) => state.NewAccount.currency)

  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )

  return (
    <BalanceCellLayout>
      <h2 className="title">Account balance</h2>
      <p className="extra-info">
        {FormatCurrencyString({
          formatString: currencyFormat,
          currencySign: DefaultCurrencySigns.get(currency) || "",
          sign: balance < 0 ? "-" : "",
          quantity: balance,
        })}
      </p>
    </BalanceCellLayout>
  )
}
const BalanceCellLayout = styled.div`
  padding: 10px 15px;
  margin-bottom: 10px;
  box-shadow: 0 5px 5px -5px #0000003f;
  background-color: var(--sub-bg);

  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: var(--sub-txt);
    margin-bottom: 2px;
  }

  .extra-info {
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: rgb(163, 87, 96);
  }
`
