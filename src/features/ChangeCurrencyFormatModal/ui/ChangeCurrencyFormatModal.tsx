import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { LanguageCell } from "@features/ChangeLanguageModal/ui/LanguageCell.tsx"
import { Languages } from "@features/ChangeLanguageModal/constants/Languages.ts"
import {
  setCurrencyFormat,
  setLanguage,
} from "@entities/Settings/model/SettingsSlice.ts"
import { FormatCell } from "@features/ChangeCurrencyFormatModal/ui/FormatCell.tsx"

export const ChangeCurrencyFormatModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.languageMenu.isOpen,
  )
  const curLanguage = useTypedSelector((state) => state.Settings.language)

  const SetCurrencyFormat = (format: string) => {
    window.localStorage.setItem("currencyFormat", format)
    dispatch(setCurrencyFormat(format))
    CloseModal()
  }

  //todo add format
  const CloseModal = () => {
    dispatch(closeMenu("currencyFormatMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <CurrencyFormatLayout $isOpen={isOpen}>
        <SideBarModalHeader>Language</SideBarModalHeader>
        <div className="format-box">
          {Languages.map((language, index) => (
            <FormatCell
              OnClick={() => SetCurrencyFormat(language)}
              format={language}
              isActive={curLanguage === language}
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
