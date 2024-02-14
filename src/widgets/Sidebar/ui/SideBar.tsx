import styled from "styled-components"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { SideBarSection } from "@shared/ui/SideBarSection.tsx"
import { SideBarHeader } from "@widgets/Sidebar/ui/SideBarHeader.tsx"
import { Separator } from "@shared/ui/Separator.tsx"
import { SignOut } from "@features/SignOut"
import { ChangePassword } from "@features/ChangePassword"
import { ChangeName } from "@features/ChangeName"
import { SignIn } from "@features/SignIn"
import { ChangeFirstDayMonth } from "@features/ChangeFirstDayMonth"
import { ChangeLanguage } from "@features/ChangeLanguage"
import { ChangeTheme } from "@features/ChangeTheme"
import { ChangeCurrency } from "@features/ChangeCurrency"
import { ChangeCurrencyFormat } from "@features/ChangeCurrencyFormat"
import { ChangeFirstDayWeek } from "@features/ChangeFirstDayWeek"
import { ChangeStartScreen } from "@features/ChangeStartScreen"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"

export const SideBar = React.memo(() => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)
  const isSideBar = useTypedSelector((state) => state.UI.Modals.sideBar.isOpen)

  const CloseSideBar = () => {
    dispatch(closeMenu("sideBar"))
  }

  return (
    <>
      <Overlay $isActive={isSideBar} $zIndex={5} onClick={CloseSideBar} />
      <SideBarLayout $isSideBar={isSideBar}>
        <SideBarHeader />
        <SideBarSection>
          <div className="title">Profile</div>
          <div className="content">
            {isLoggedIn === "success" ? (
              <>
                <ChangeName />
                <ChangePassword />
                <SignOut />
              </>
            ) : (
              <SignIn />
            )}
          </div>
        </SideBarSection>
        <Separator />
        <SideBarSection>
          <div className="title">Settings</div>
          <div className="content">
            <ChangeLanguage />
            <ChangeTheme />
            <ChangeCurrency />
            <ChangeCurrencyFormat />
            <ChangeFirstDayWeek />
            <ChangeFirstDayMonth />
            <ChangeStartScreen />
          </div>
        </SideBarSection>
      </SideBarLayout>
    </>
  )
})
const SideBarLayout = styled.div<{
  $isSideBar?: boolean
}>`
  position: absolute;
  background-color: var(--sub-bg);
  z-index: 10;
  top: 0;
  left: ${({ $isSideBar }) => ($isSideBar ? "0" : "-100%")};
  width: 75%;
  min-width: 270px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  transition: left 0.5s;
`
