import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { AccountCurrencyMenu } from "@features/AccountCurrencyModal/ui/AccountCurrencyMenu.tsx"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"

//todo implement index files and rename some files in modules and handle names in index
export const AccountCurrencyModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.accountCurrencyMenu.isOpen,
  )

  const CloseModal = () => {
    dispatch(closeMenu("accountCurrencyMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <CurrencyModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>Currency</SideBarModalHeader>
        <AccountCurrencyMenu />
      </CurrencyModalLayout>
    </>
  )
})
const CurrencyModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  transition: height 0.3s;
  height: 500px;
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
