import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "/icons/general/categories.svg"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"
import { useTranslation } from "react-i18next"
import LanguageIcon from "@icons/general/language.svg?react"

export const ChangeLanguage = React.memo(() => {
  const dispatch = useAppDispatch()

  const language = useTypedSelector((state) => state.Settings.language)

  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("languageMenu"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.language")}
      subTitle={FullNameLanguages.get(language)}
      Icon={LanguageIcon}
    />
  )
})
