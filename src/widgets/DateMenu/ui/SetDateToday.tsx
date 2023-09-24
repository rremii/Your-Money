import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { PickDateBtn } from "@widgets/DateMenu/ui/PickDateBtn.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Months } from "@shared/helpers/TimeGap.ts"
import { IsToday } from "@shared/helpers/IsToday.ts"
import { setChangeDateMenu, setCurDateStr } from "@entities/CurTransaction/model/CurTransactionSlice.ts"


export const SetDateToday = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(state => state.CurTransaction.category.color)
  const dateStr = useTypedSelector(state => state.CurTransaction.dateStr)

  const isActive = IsToday(dateStr)

  const now = new Date()
  const month = Months.get(now.getMonth())
  const day = now.getDate()

  const subTitle = month + " " + day

  const SetDateToday = () => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    dispatch(setCurDateStr(today.toUTCString()))
    dispatch(setChangeDateMenu(false))
  }

  return <PickDateBtn OnClick={SetDateToday} isActive={isActive} color={color} title="Today" img={Category}
                      subTitle={subTitle} />
}