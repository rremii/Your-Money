import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { PickDateBtn } from "@shared/ui/PickDateBtn.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IsToday } from "@shared/helpers/IsToday.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { setChangeDateMenu } from "@entities/Modals/model/ChangeDateMenuSlice.ts"
import { Months } from "@shared/constants/Months.ts"


export const SetDateToday = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(state => state.EditCreateTransaction.ChosenCategory.color)
  const dateStr = useTypedSelector(state => state.EditCreateTransaction.Transaction.dateStr)

  const isActive = IsToday(dateStr)

  const now = new Date()
  const month = Months.get(now.getMonth())
  const day = now.getDate()

  const subTitle = month + " " + day

  const SetDateToday = () => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    dispatch(setEditTransDateStr(today.toUTCString()))
    dispatch(setChangeDateMenu(false))
  }

  return <PickDateBtn OnClick={SetDateToday} isActive={isActive} color={color} title="Today" img={Category}
                      subTitle={subTitle} />
}