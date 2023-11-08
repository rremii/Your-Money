import styled from "styled-components"
import React, { FC } from "react"
import { SignOutMenu } from "@widgets/SignOutMenu/ui/SignOutMenu.tsx"
import { PasswordMenu } from "@widgets/PasswordMenu/ui/PasswordMenu.tsx"
import { NameMenu } from "@widgets/NameMenu/ui/NameMenu.tsx"
import { Toast } from "@shared/ui/Toast.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAllTransDateGap } from "@entities/DateSlider/model/useAllTransDateGap.tsx"
import { ChooseCategoryMenu } from "@widgets/ChooseCategoryMenu/ui/ChooseCategoryMenu.tsx"
import { ChooseAccountMenu } from "@widgets/ChooseAccountMenu/ui/ChooseAccountMenu.tsx"
import { TitleMenu } from "@widgets/TitleMenu/ui/TitleMenu.tsx"
import { DateMenu } from "@widgets/DateMenu/ui/DateMenu.tsx"
import { CalendarMenu } from "@widgets/CalendarMenu/ui/CalendarMenu.tsx"
import { ChooseCategorySlideMenu } from "@widgets/ChooseCategorySlideMenu/ui/ChooseCategorySlideMenu.tsx"
import { EditCreateTransMenu } from "@widgets/EditCreateTransMenu/ui/EditCreateTransMenu.tsx"
import { CurrencyModal } from "@features/CurrencyModal/ui/CurrencyModal.tsx"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {

  const { data: user } = GetMe.useQueryState()
  useAccount(user?.id)
  useAllTransDateGap()

  return (
    <LayoutStyles>
      {children}
      <Toast />

      <EditCreateTransMenu />
      <ChooseCategoryMenu />
      <ChooseCategorySlideMenu />
      <ChooseAccountMenu />
      <TitleMenu />
      <DateMenu />
      <CalendarMenu />
      <CurrencyModal />

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
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`
