import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"

export const ChangeLanguage = React.memo(() => {
  const dispatch = useAppDispatch()

  const language = useTypedSelector((state) => state.Settings.language)

  const handleClick = () => {
    dispatch(openMenu("languageMenu"))
  }

  return (
    <SideBarBtn
      onClick={handleClick}
      title="Language"
      subTitle={FullNameLanguages.get(language)}
      icon={Categories}
    />
  )
})
