import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo, useCallback } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { setTheme } from "@entities/Settings/model/SettingsSlice.ts"
import { Themes } from "@features/ChangeThemeModal/constants/Themes.ts"
import { ThemeCell } from "@features/ChangeThemeModal/ui/ThemeCell.tsx"
import { themeType } from "@entities/Settings/types.ts"
import { useTranslation } from "react-i18next"

export const ChangeThemeModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector((state) => state.UI.Modals.themeMenu.isOpen)
  const curTheme = useTypedSelector((state) => state.Settings.theme)

  const { t } = useTranslation()

  const SetTheme = useCallback((theme: themeType) => {
    window.localStorage.setItem("theme", theme)
    dispatch(setTheme(theme))
    CloseModal()
  }, [])

  const CloseModal = () => {
    dispatch(closeMenu("themeMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <LanguageModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>{t("themeMenu.title")}</SideBarModalHeader>
        <div className="theme-box">
          {Themes.map((theme, index) => (
            <ThemeCell
              OnClick={SetTheme}
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

    border-bottom: 1px solid #707070;

    padding-bottom: 20px;
  }
`
