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
  setLanguage,
  setTheme,
  themeType,
} from "@entities/Settings/model/SettingsSlice.ts"
import { Themes } from "@features/ChangeThemeModal/constants/Themes.ts"
import { ThemeCell } from "@features/ChangeThemeModal/ui/ThemeCell.tsx"

export const ChangeThemeModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector((state) => state.UI.Modals.themeMenu.isOpen)
  const curTheme = useTypedSelector((state) => state.Settings.theme)

  const SetTheme = (theme: themeType) => {
    window.localStorage.setItem("theme", theme)
    dispatch(setTheme(theme))
    CloseModal()
  }

  const CloseModal = () => {
    dispatch(closeMenu("themeMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <LanguageModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>Language</SideBarModalHeader>
        <div className="theme-box">
          {Themes.map((theme, index) => (
            <ThemeCell
              OnClick={() => SetTheme(theme)}
              theme={theme}
              isActive={curTheme === theme}
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

  .theme-box {
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
