import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { CurrencyModalHeader } from "@shared/ui/СurrencyModal/CurrencyModalHeader.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu, setCurrencyMenuType } from "@entities/Modals/model/ModalsSlice.ts"
import { CurrencyMenu } from "@features/DefaultCurrencyModal/ui/CurrencyMenu.tsx"
import { CurrencySignMenu } from "@features/DefaultCurrencyModal/ui/CurrencySignMenu.tsx"
import { GetModalHeightByContent } from "@features/DefaultCurrencyModal/helpers/GetModalHeightByContent.ts"


export const CurrencyModal = () => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.Modals.currencyMenu.isOpen)
  const menuType = useTypedSelector(state => state.Modals.currencyMenu.menuType)
  const currency = useTypedSelector(state => state.Settings.curCurrency)


  const CloseModal = () => {
    dispatch(closeMenu("currencyMenu"))
    dispatch(setCurrencyMenuType("currency"))
  }

  const modalHeight = GetModalHeightByContent(menuType, currency)
  return <>
    <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
    <CurrencyModalLayout $height={modalHeight}
                         $isOpen={isOpen}>
      <CurrencyModalHeader>Currency</CurrencyModalHeader>
      {menuType === "currency" ? (
        <CurrencyMenu />
      ) : (
        <CurrencySignMenu />
      )}
    </CurrencyModalLayout>
  </>
}
const CurrencyModalLayout = styled(Modal)<{
  $height?: number
}>`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  transition: height 0.3s;
  height: ${({ $height }) => $height ? $height + "px" : "500px"};
  overflow-y: hidden;

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
