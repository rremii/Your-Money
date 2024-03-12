import styled from "styled-components"
import React, { FC } from "react"
import { SignOutMenu } from "@widgets/SignOutMenu/ui/SignOutMenu.tsx"
import { PasswordMenu } from "@features/PasswordMenu/ui/PasswordMenu.tsx"
import { NameMenu } from "@features/NameMenu/ui/NameMenu.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAllTransDateGap } from "@entities/DateSlider/model/useAllTransDateGap.tsx"
import { ChooseCategoryMenu } from "@features/ChooseCategoryMenu/ui/ChooseCategoryMenu.tsx"
import { ChooseTransAccountMenu } from "@features/ChooseTransAccountMenu/ui/ChooseTransAccountMenu.tsx"
import { TitleMenu } from "@features/TitleMenu/ui/TitleMenu.tsx"
import { DateMenu } from "@features/DateMenu/ui/DateMenu.tsx"
import { TransCalendarMenu } from "@features/TransCalendarMenu/ui/TransCalendarMenu.tsx"
import { ChooseCategorySlideMenu } from "@features/ChooseCategorySlideMenu/ui/ChooseCategorySlideMenu.tsx"
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
import { useTheme } from "@entities/Settings/hooks/useTheme.tsx"
import { ChangeCurrencyFormatModal } from "@features/ChangeCurrencyFormatModal/ui/ChangeCurrencyFormatModal.tsx"
import { LoadingToast, NotifyToast } from "@shared/GlobalModules/Toasts"
import { ChangeDateRangeModal } from "@features/ChangeDateRangeModal/ui/ChangeDateRangeModal.tsx"
import { CalendarMenu } from "@features/CalendarMenu/ui/CalendarMenu.tsx"
import { ChangeAccountModal } from "@features/ChangeAccountModal/ui/ChangeAccountModal.tsx"
import { WeekDayModal } from "@features/ChangeFirstDayWeekModal/ui/WeekDayModal.tsx"
import { ChangeStartScreenModal } from "@features/ChangeStartScreenModal/ui/ChangeStartScreenModal.tsx"
import { useStartScreen } from "@entities/Settings/hooks/useStartScreen.tsx"

// const EditCreateTransaction = lazy(()=>import())

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

  useStartScreen()
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
      <ChooseTransAccountMenu />
      <TitleMenu />
      <DateMenu />
      <TransCalendarMenu />
      <CurrencyModal />

      <CalendarMenu />
      <ChangeDateRangeModal />

      <ChangeAccountModal />
      <EditCreateCategoryMenu />
      <CategoryIconPickerModal />

      <EditCreateAccountMenu />
      <AccountIconPickerModal />
      <AccountCurrencyModal />

      <ChangeStartScreenModal />
      <DefaultCurrencyModal />
      <ChangeLanguageModal />
      <WeekDayModal />
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
  background-color: var(--sub-bg);
`
