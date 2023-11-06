import { PickDateBtn } from "@shared/ui/PickDateBtn.tsx"
import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsYesterday } from "@shared/helpers/IsYesterday.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { Months } from "@shared/constants/Months.ts"
import { closeMenu } from "@entities/Modals/model/ModalsSlice.ts"


export const SetDateYesterday = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(state => state.EditCreateTransaction.ChosenCategory.color)
  const dateStr = useTypedSelector(state => state.EditCreateTransaction.Transaction.dateStr)


  const isActive = IsYesterday(dateStr)

  const { dateFrom } = timeGap.GetDayGap(-1)
  const month = Months.get(dateFrom.getMonth())
  const day = dateFrom.getDate()

  const subTitle = month + " " + day

  const SetDateYesterday = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    dispatch(setEditTransDateStr(today.toUTCString()))
    dispatch(closeMenu("dateMenu"))
  }

  return <PickDateBtn OnClick={SetDateYesterday} isActive={isActive} color={color} title="Yesterday" img={Category}
                      subTitle={subTitle} />

}