import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  closeMenu,
  setCurrencyMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { CurrencyMenu } from "@features/DefaultCurrencyModal/ui/CurrencyMenu.tsx"
import { CurrencySignMenu } from "@features/DefaultCurrencyModal/ui/CurrencySignMenu.tsx"
import { GetModalHeightByContent } from "@features/DefaultCurrencyModal/helpers/GetModalHeightByContent.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { useTranslation } from "react-i18next"

export const CurrencyModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.currencyMenu.isOpen,
  )
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.currencyMenu.menuType,
  )
  const currency = useTypedSelector((state) => state.Settings.curCurrency)

  const { t } = useTranslation()

  const CloseModal = () => {
    dispatch(closeMenu("currencyMenu"))
    dispatch(setCurrencyMenuType("currency"))
  }

  const modalHeight = GetModalHeightByContent(menuType, currency)
  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <CurrencyModalLayout $height={modalHeight} $isOpen={isOpen}>
        <SideBarModalHeader>
          {t("defaultCurrencyMenu.title")}
        </SideBarModalHeader>
        {menuType === "currency" ? <CurrencyMenu /> : <CurrencySignMenu />}
      </CurrencyModalLayout>
    </>
  )
})
const CurrencyModalLayout = styled(Modal)<{
  $height?: number
}>`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  transition: height 0.3s;
  height: ${({ $height }) => ($height ? $height + "px" : "500px")};
  overflow-y: hidden;

  background-color: var(--sub-bg-light);

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
    font-size: 18px;

    button {
      font-size: 13px;
    }
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
