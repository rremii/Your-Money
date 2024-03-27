import { PickDateBtn } from "@shared/ui/PickDateBtn.tsx"
import Category from "../../../../public/icons/general/categories.png"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { IsYesterday } from "@shared/helpers/IsYesterday.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { Months } from "@shared/constants/Months.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const SetDateYesterday = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )
  const dateStr = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.dateStr,
  )

  const { t } = useTranslation()

  const isActive = IsYesterday(dateStr)

  const { dateFrom } = timeGap.GetDayGap(-1)
  const month = Months.get(dateFrom.getMonth()) as string
  const day = dateFrom.getDate()

  const subTitle =
    t("general.months", { context: [month.toLowerCase()] }) + " " + day

  const SetDateYesterday = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    dispatch(setEditTransDateStr(today.toUTCString()))
    dispatch(closeMenu("dateMenu"))
  }

  return (
    <PickDateBtn
      OnClick={SetDateYesterday}
      isActive={isActive}
      color={color}
      title={t("general.time.yesterday")}
      img={Category}
      subTitle={subTitle}
    />
  )
}
