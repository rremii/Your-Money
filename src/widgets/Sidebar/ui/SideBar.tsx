import styled from "styled-components"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setIsSideBar } from "@entities/SideBar"
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
import { useGetMeQuery } from "@entities/User/api/UserApi.ts"

export const SideBar = () => {
  const dispatch = useAppDispatch()

  const isSideBar = useTypedSelector((state) => state.SideBar.isSideBarOpen)
  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)


  const CloseSideBar = () => {
    dispatch(setIsSideBar(false))
  }
  return (
    <>
      <OverLay onClick={CloseSideBar} $isSideBar={isSideBar} />
      <SideBarLayout $isSideBar={isSideBar}>
        <SideBarHeader />
        <SideBarSection>
          <div className="title">Profile</div>
          <div className="content">
            {isLoggedIn === "success" ? <>
                <ChangeName />
                <ChangePassword />
                <SignOut />
              </> :
              <SignIn />}
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
}
const SideBarLayout = styled.div<{
  $isSideBar?: boolean
}>`
  position: absolute;
  background-color: var(--bg-1);
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
const OverLay = styled.div<{
  $isSideBar?: boolean
}>`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.68);
  opacity: ${({ $isSideBar }) => ($isSideBar ? "1" : "0")};
  pointer-events: ${({ $isSideBar }) => ($isSideBar ? "initial" : "none")};
  transition: 0.5s;
`
