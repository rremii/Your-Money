import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { PickDateBtn } from "@widgets/DateMenu/ui/PickDateBtn.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"
import { Months, timeGap } from "@shared/helpers/TimeGap.ts"
import { IsToday } from "@shared/helpers/IsToday.ts"


export const SetDateToday = () => {
  const color = useTypedSelector(state => state.CurTransaction.category.color)
  const dateStr = useTypedSelector(state => state.CurTransaction.dateStr)

  const isActive = IsToday(dateStr)

  const now = new Date()
  const month = Months.get(now.getMonth())
  const day = now.getDate()

  const subTitle = month + " " + day

  return <PickDateBtn isActive={isActive} color={color} title="Today" img={Category} subTitle={subTitle} />
}