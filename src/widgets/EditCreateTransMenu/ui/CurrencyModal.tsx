import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo, useState } from "react"
import { CurrencyCell } from "@features/DefaultCurrencyModal/ui/CurrencyCell.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setEditCurrency } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { Currency } from "@entities/Currency/types.ts"
import { MainCurrencies } from "@entities/Currency/constants/MainCurrencies.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { useTranslation } from "react-i18next"

export const CurrencyModal = memo(() => {
  const dispatch = useAppDispatch()

  const currency = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.currency,
  )
  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.editCreateCurrencyMenu.isOpen,
  )
  const [chosenCurrency, setCurrency] = useState<Currency>(currency)

  const { t } = useTranslation()

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

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <CurrencyModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>
          {t("defaultCurrencyMenu.title")}
        </SideBarModalHeader>
        <p className="subTitle">{t("defaultCurrencyMenu.subTitle")}</p>
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
            {t("general.buttons.cancel")}
          </button>
          <button className="gray" onClick={OnSubmit} type="submit">
            {t("general.buttons.done")}
          </button>
        </div>
      </CurrencyModalLayout>
    </>
  )
})
const CurrencyModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;

  .subTitle {
    color: #5c6ac0;
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

    border-bottom: 1px solid #707070;

    padding-bottom: 20px;
  }
`
