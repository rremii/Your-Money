import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo, useCallback } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { LanguageCell } from "@features/ChangeLanguageModal/ui/LanguageCell.tsx"
import { Languages } from "@features/ChangeLanguageModal/constants/Languages.ts"
import { setLanguage } from "@entities/Settings/model/SettingsSlice.ts"
import { useTranslation } from "react-i18next"

export const ChangeLanguageModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.languageMenu.isOpen,
  )
  const curLanguage = useTypedSelector((state) => state.Settings.language)

  const { t } = useTranslation()

  const SetLanguage = useCallback((language: string) => {
    window.localStorage.setItem("language", language)
    dispatch(setLanguage(language))
    CloseModal()
  }, [])

  const CloseModal = () => {
    dispatch(closeMenu("languageMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <LanguageModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>{t("languageMenu.title")}</SideBarModalHeader>
        <div className="languages-box">
          {Languages.map((language, index) => (
            <LanguageCell
              OnClick={SetLanguage}
              language={language}
              isActive={curLanguage === language}
              key={index}
            />
          ))}
        </div>
      </LanguageModalLayout>
    </>
  )
})
const LanguageModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  background-color: var(--sub-bg-light);

  .languages-box {
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
