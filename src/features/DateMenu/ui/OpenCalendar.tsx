import { PickDateBtn } from "@shared/ui/PickDateBtn.tsx"
import Category from "/icons/general/categories.svg"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IsYesterday } from "@shared/helpers/IsYesterday.ts"
import { IsToday } from "@shared/helpers/IsToday.ts"
import { Months } from "@shared/constants/Months.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"
import CalendarIcon from "@icons/general/event.svg?react"

export const OpenCalendar = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color
  )
  const dateStr = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.dateStr
  )

  const { t } = useTranslation()

  const OpenCalendar = () => {
    dispatch(openMenu("transCalendarMenu"))
  }

  const date = new Date(dateStr)
  const isActive = !IsYesterday(date) && !IsToday(date)

  const month = Months.get(date.getMonth())
  const day = date.getDate()
  const year = date.getFullYear()

  const subTitle = month + " " + day + ", " + year

  return (
    <PickDateBtn
      color={color}
      isActive={isActive}
      title={t("dateRange.selectDay")}
      subTitle={isActive ? subTitle : ""}
      Icon={<CalendarIcon className="icon" />}
      OnClick={OpenCalendar}
    />
  )
}
