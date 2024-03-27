import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "../../../../public/icons/general/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"
import { useTranslation } from "react-i18next"

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
      icon={Categories}
    />
  )
})
