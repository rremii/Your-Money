import styled from "styled-components"
import { CurrencyCell } from "@features/DefaultCurrencyModal/ui/CurrencyCell.tsx"
import React, { useState } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Currency } from "@entities/Currency/types.ts"
import { MainCurrencies } from "@entities/Currency/constants/MainCurrencies.ts"
import { setNewAccountCurrency } from "@entities/Account/model/NewAccountSlice.ts"

export const AccountCurrencyMenu = () => {
  const dispatch = useAppDispatch()

  const currency = useTypedSelector((state) => state.NewAccount.currency)

  const [chosenCurrency, setCurrency] = useState<Currency>(currency)

  const SetChosenCurrency = (currency: Currency) => {
    setCurrency(currency)
  }
  const OnSubmit = () => {
    dispatch(setNewAccountCurrency(chosenCurrency))
    CloseModal()
  }
  const CloseModal = () => {
    dispatch(closeMenu("accountCurrencyMenu"))
  }

  return (
    <CurrencyMenuLayout>
      <p className="subTitle">Main currencies</p>
      <div className="currencies-box">
        {MainCurrencies.map(({ fullName, shortName }, index) => (
          <CurrencyCell
            OnClick={() => SetChosenCurrency(shortName)}
            fullName={fullName}
            shortName={shortName}
            isActive={chosenCurrency === shortName}
            key={index}
          />
        ))}
      </div>
      <div className="btn-section">
        <button className="gray" onClick={CloseModal} type="button">
          Cancel
        </button>
        <button className="gray" onClick={OnSubmit} type="submit">
          Done
        </button>
      </div>
    </CurrencyMenuLayout>
  )
}
const CurrencyMenuLayout = styled.div`
  overflow-y: hidden;
  height: 100%;

  .currencies-box {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
  }
`
