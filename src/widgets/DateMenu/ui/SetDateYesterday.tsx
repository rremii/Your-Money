import { PickDateBtn } from "@widgets/DateMenu/ui/PickDateBtn.tsx"
import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Months, timeGap } from "@shared/helpers/TimeGap.ts"
import { IsYesterday } from "@shared/helpers/IsYesterday.ts"
import { setChangeDateMenu, setCurDateStr } from "@entities/CurTransaction/model/CurTransactionSlice.ts"


export const SetDateYesterday = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(state => state.CurTransaction.category.color)
  const dateStr = useTypedSelector(state => state.CurTransaction.dateStr)


  const isActive = IsYesterday(dateStr)

  const { dateFrom } = timeGap.GetDayGap(-1)
  const month = Months.get(dateFrom.getMonth())
  const day = dateFrom.getDate()

  const subTitle = month + " " + day

  const SetDateYesterday = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    dispatch(setCurDateStr(today.toUTCString()))
    dispatch(setChangeDateMenu(false))
  }

  return <PickDateBtn OnClick={SetDateYesterday} isActive={isActive} color={color} title="Yesterday" img={Category}
                      subTitle={subTitle} />

}