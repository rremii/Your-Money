import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo, useCallback } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { setStartScreen } from "@entities/Settings/model/SettingsSlice.ts"
import { startScreenType } from "@entities/Settings/types.ts"
import { Screens } from "@features/ChangeStartScreenModal/constants/Screens.ts"
import { ScreenCell } from "@features/ChangeStartScreenModal/ui/ScreenCell.tsx"
import { useTranslation } from "react-i18next"

export const ChangeStartScreenModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.startScreenMenu.isOpen,
  )
  const curScreen = useTypedSelector((state) => state.Settings.startScreen)

  const { t } = useTranslation()

  const SetScreen = useCallback((screen: startScreenType) => {
    window.localStorage.setItem("startScreen", screen)
    dispatch(setStartScreen(screen))
    CloseModal()
  }, [])

  const CloseModal = () => {
    dispatch(closeMenu("startScreenMenu"))
  }
  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <ScreenModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>{t("startScreenMenu.title")}</SideBarModalHeader>
        <div className="screens-box">
          {Screens.map((screen, index) => (
            <ScreenCell
              OnClick={SetScreen}
              screen={screen}
              isActive={curScreen === screen}
              key={index}
            />
          ))}
        </div>
      </ScreenModalLayout>
    </>
  )
})
const ScreenModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  background-color: var(--sub-bg-light);

  .screens-box {
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
