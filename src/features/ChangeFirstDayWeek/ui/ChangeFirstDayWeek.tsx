import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { Days, FullDays } from "@shared/constants/Days.ts"

export const ChangeFirstDayWeek = React.memo(() => {
  const dispatch = useAppDispatch()

  const curDay = useTypedSelector((state) => state.Settings.firstDay)

  const handleClick = () => {
    dispatch(openMenu("firstWeekDayMenu"))
  }

  const fullDayName = FullDays.get(Days.get(curDay)) as string

  return (
    <SideBarBtn
      onClick={handleClick}
      title="First Day of week"
      subTitle={fullDayName}
      icon={Categories}
    />
  )
})
