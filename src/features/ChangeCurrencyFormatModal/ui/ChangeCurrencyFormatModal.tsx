import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo, useCallback } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { setCurrencyFormat } from "@entities/Settings/model/SettingsSlice.ts"
import { FormatCell } from "@features/ChangeCurrencyFormatModal/ui/FormatCell.tsx"
import { CurrencyFormats } from "@features/ChangeCurrencyFormatModal/constants/CurrencyFormats.ts"

export const ChangeCurrencyFormatModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.currencyFormatMenu.isOpen,
  )
  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const currencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )

  const SetCurrencyFormat = useCallback((format: string) => {
    window.localStorage.setItem("currencyFormat", format)
    dispatch(setCurrencyFormat(format))
    CloseModal()
  }, [])

  const CloseModal = () => {
    dispatch(closeMenu("currencyFormatMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <CurrencyFormatLayout $isOpen={isOpen}>
        <SideBarModalHeader>Currency format</SideBarModalHeader>
        <div className="format-box">
          {CurrencyFormats.map((format, index) => (
            <FormatCell
              currencySign={currencySign}
              OnClick={SetCurrencyFormat}
              format={format}
              isActive={currencyFormat === format}
              key={index}
            />
          ))}
        </div>
      </CurrencyFormatLayout>
    </>
  )
})
const CurrencyFormatLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  background-color: var(--sub-bg);

  .format-box {
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
