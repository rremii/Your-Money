import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { Currency } from "@entities/Account/types.ts"
import React, { useState } from "react"
import { CurrencyModalHeader } from "@features/CurrencyModal/ui/CurrencyModalHeader.tsx"
import { CurrencyCell } from "@features/CurrencyModal/ui/CurrencyCell.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setEditCurrency } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { closeMenu } from "@entities/Modals/model/ModalsSlice.ts"

interface ICurrencyCell {
  fullName: string
  shortName: Currency
}

export const CurrencyModal = () => {
  const dispatch = useAppDispatch()

  const currency = useTypedSelector(state => state.EditCreateTransaction.Transaction.currency)
  const isOpen = useTypedSelector(state => state.Modals.editCreateCurrencyMenu.isOpen)

  const [chosenCurrency, setCurrency] = useState<Currency>(currency)

  const SetChosenCurrency = (currency: Currency) => {
    setCurrency(currency)
  }
  const OnSubmit = () => {
    dispatch(setEditCurrency(chosenCurrency))
    CloseModal()
  }
  const CloseModal = () => {
    dispatch(closeMenu("editCreateCurrencyMenu"))
  }

  const MainCurrencies: ICurrencyCell[] = [

    { fullName: "Australian dollar", shortName: Currency.AustralianDollar },
    { fullName: "British pound", shortName: Currency.BritishPound },
    { fullName: "Canadian dollar", shortName: Currency.CanadianDollar },
    { fullName: "Chinese yuan", shortName: Currency.ChineseYuan },
    { fullName: "Euro", shortName: Currency.Euro },
    { fullName: "Japanese yen", shortName: Currency.JapaneseYen },
    { fullName: "Russian ruble", shortName: Currency.RussianRuble },
    { fullName: "Swiss franc", shortName: Currency.SwissFranc },
    { fullName: "UnitedStates dollar", shortName: Currency.UnitedStatesDollar },
    { fullName: "Belarusian ruble", shortName: Currency.BelarusianRuble }
  ]

  return <>
    <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
    <CurrencyModalLayout $isOpen={isOpen}>
      <CurrencyModalHeader>Currency</CurrencyModalHeader>
      <p className="subTitle">Main currencies</p>
      <div className="currencies-box">
        {MainCurrencies.map(({ fullName, shortName }) => (
          <CurrencyCell OnClick={() => SetChosenCurrency(shortName)}
                        fullName={fullName}
                        shortName={shortName}
                        isActive={chosenCurrency === shortName} />
        ))}
      </div>
      <div className="btn-section">
        <button className="gray" onClick={CloseModal} type="button">Cancel</button>
        <button className="gray" onClick={OnSubmit} type="submit">Done</button>
      </div>
    </CurrencyModalLayout>
  </>
}
const CurrencyModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;


  .subTitle {
    color: var(--txt-3);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.14px;
    margin-bottom: 15px;
  }

  .btn-section {
    margin-top: 20px;
  }

  .currencies-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;

    max-height: 350px;
    overflow-y: auto;

    border-bottom: 1px solid var(--bg-11);

    padding-bottom: 20px;
  }
`
