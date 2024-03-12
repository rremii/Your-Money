import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { Days, FullDays } from "@shared/constants/Days.ts"
import { useTranslation } from "react-i18next"

export const ChangeFirstDayWeek = React.memo(() => {
  const dispatch = useAppDispatch()

  const curDay = useTypedSelector((state) => state.Settings.firstDay)

  const { t } = useTranslation()

  const handleClick = () => {
    dispatch(openMenu("firstWeekDayMenu"))
  }

  const translateCtx = curDay.toLowerCase().slice(0, 3)

  return (
    <SideBarBtn
      onClick={handleClick}
      title={t("sideBar.firstDayWeek")}
      subTitle={t("general.days", { context: translateCtx })}
      icon={Categories}
    />
  )
})
