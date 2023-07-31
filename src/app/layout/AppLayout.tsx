import styled from "styled-components"
import React, { FC } from "react"
import { SignOutMenu } from "@widgets/SignOutMenu/ui/SignOutMenu.tsx"
import { SideBarOverlay } from "@features/Overlays/ui/SideBarOverlay.tsx"
import { SideBarModalsOverlay } from "@features/Overlays/ui/SideBarModalsOverlay.tsx"
import { PasswordMenu } from "@widgets/PasswordMenu/ui/PasswordMenu.tsx"
import { NameMenu } from "@widgets/NameMenu/ui/NameMenu.tsx"
import { Toast } from "@shared/ui/Toast.tsx"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {

  return (
    <LayoutStyles>
      {children}
      <Toast />

      <SideBarOverlay />
      <SideBarModalsOverlay />

      <SignOutMenu />
      <PasswordMenu />
      <NameMenu />


    </LayoutStyles>
  )
}
export default AppLayout
const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 450px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`
