import { PickDateBtn } from "@widgets/DateMenu/ui/PickDateBtn.tsx"
import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FullDays, Months, timeGap } from "@shared/helpers/TimeGap.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"
import { IsYesterday } from "@shared/helpers/IsYesterday.ts"


export const SetDateYesterday = () => {

  const color = useTypedSelector(state => state.CurTransaction.category.color)
  const dateStr = useTypedSelector(state => state.CurTransaction.dateStr)


  const isActive = IsYesterday(dateStr)

  const { dateFrom } = timeGap.GetDayGap(-1)
  const month = Months.get(dateFrom.getMonth())
  const day = dateFrom.getDate()

  const subTitle = month + " " + day

  return <PickDateBtn isActive={isActive} color={color} title="Yesterday" img={Category} subTitle={subTitle} />

}