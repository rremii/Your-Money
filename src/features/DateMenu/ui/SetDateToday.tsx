import Category from "@shared/assets/LightTheme/categories.png"
import React from "react"
import { PickDateBtn } from "@shared/ui/PickDateBtn.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IsToday } from "@shared/helpers/IsToday.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { Months } from "@shared/constants/Months.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const SetDateToday = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )
  const dateStr = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.dateStr,
  )

  const { t } = useTranslation()

  const isActive = IsToday(dateStr)

  const now = new Date()
  const month = Months.get(now.getMonth()) as string
  const day = now.getDate()

  const subTitle =
    t("general.months", { context: month.toLowerCase() }) + " " + day

  const SetDateToday = () => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    dispatch(setEditTransDateStr(today.toUTCString()))
    dispatch(closeMenu("dateMenu"))
  }

  return (
    <PickDateBtn
      OnClick={SetDateToday}
      isActive={isActive}
      color={color}
      title={t("general.time.today")}
      img={Category}
      subTitle={subTitle}
    />
  )
}
