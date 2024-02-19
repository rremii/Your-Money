import styled from "styled-components"
import React, { FC } from "react"
import { SignOutMenu } from "@widgets/SignOutMenu/ui/SignOutMenu.tsx"
import { PasswordMenu } from "@widgets/PasswordMenu/ui/PasswordMenu.tsx"
import { NameMenu } from "@widgets/NameMenu/ui/NameMenu.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAllTransDateGap } from "@entities/DateSlider/model/useAllTransDateGap.tsx"
import { ChooseCategoryMenu } from "@widgets/ChooseCategoryMenu/ui/ChooseCategoryMenu.tsx"
import { ChooseAccountMenu } from "@widgets/ChooseAccountMenu/ui/ChooseAccountMenu.tsx"
import { TitleMenu } from "@widgets/TitleMenu/ui/TitleMenu.tsx"
import { DateMenu } from "@widgets/DateMenu/ui/DateMenu.tsx"
import { TransCalendarMenu } from "@widgets/TransCalendarMenu/ui/TransCalendarMenu.tsx"
import { ChooseCategorySlideMenu } from "@widgets/ChooseCategorySlideMenu/ui/ChooseCategorySlideMenu.tsx"
import { EditCreateTransMenu } from "@widgets/EditCreateTransMenu/ui/EditCreateTransMenu.tsx"
import { CurrencyModal } from "@widgets/EditCreateTransMenu/ui/CurrencyModal.tsx"
import { DefaultCurrencyModal } from "@features/DefaultCurrencyModal"
import { EditCreateCategoryMenu } from "@widgets/EditCreateCategoryMenu/ui/EditCreateCategoryMenu.tsx"
import { CategoryIconPickerModal } from "@features/CategoryIconPickerModal/ui/CategoryIconPickerModal.tsx"
import { EditCreateAccountMenu } from "@widgets/EditCreateAccountMenu/ui/EditCreateAccountMenu.tsx"
import { AccountIconPickerModal } from "@features/AccountIconPickerModal/ui/AccountIconPickerModal.tsx"
import { AccountCurrencyModal } from "@features/AccountCurrencyModal/ui/AccountCurrencyModal.tsx"
import { ChangeLanguageModal } from "@features/ChangeLanguageModal/ui/ChangeLanguageModal.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { usePreloader } from "@shared/hooks/usePreloader.tsx"
import { useI18n } from "@shared/i18n/useI18n.tsx"
import { ChangeThemeModal } from "@features/ChangeThemeModal/ui/ChangeThemeModal.tsx"
import { SetStyleProperty } from "@entities/Settings/helpers/SetStyleProperty.tsx"
import { useTheme } from "@entities/Settings/hooks/useTheme.tsx"
import { ChangeCurrencyFormatModal } from "@features/ChangeCurrencyFormatModal/ui/ChangeCurrencyFormatModal.tsx"
import { LoadingToast, NotifyToast } from "@shared/GlobalModules/Toasts"
import { ChangeDateRangeModal } from "@features/ChangeDateRangeModal/ui/ChangeDateRangeModal.tsx"
import { CalendarMenu } from "@features/CalendarMenu/ui/CalendarMenu.tsx"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)
  const language = useTypedSelector((state) => state.Settings.language)
  const theme = useTypedSelector((state) => state.Settings.theme)

  //todo check if i need that
  const { data: user } = GetMe.useQueryState()
  useAccount(user?.id)
  useAllTransDateGap()

  useTheme(theme)
  useI18n(language)
  usePreloader(isLoggedIn)
  return (
    <LayoutStyles>
      {children}
      <NotifyToast />
      <LoadingToast />

      <EditCreateTransMenu />
      <ChooseCategoryMenu />
      <ChooseCategorySlideMenu />
      <ChooseAccountMenu />
      <TitleMenu />
      <DateMenu />
      <TransCalendarMenu />
      <CurrencyModal />

      <CalendarMenu />
      <ChangeDateRangeModal />

      <EditCreateCategoryMenu />
      <CategoryIconPickerModal />

      <EditCreateAccountMenu />
      <AccountIconPickerModal />
      <AccountCurrencyModal />

      <DefaultCurrencyModal />
      <ChangeLanguageModal />
      <ChangeThemeModal />
      <SignOutMenu />
      <PasswordMenu />
      <NameMenu />
      <ChangeCurrencyFormatModal />
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
