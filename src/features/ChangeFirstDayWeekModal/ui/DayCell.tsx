import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { DayType } from "@shared/constants/Days.ts"
import { useTranslation } from "react-i18next"

interface props {
  day: string
  isActive: boolean
  OnClick: (day: DayType) => void
}

export const DayCell: FC<props> = memo(({ day, isActive, OnClick }) => {
  const { t } = useTranslation()

  const translateCtx = day.toLowerCase().slice(0, 3)
  return (
    <DayCellLayout onClick={() => OnClick(day.slice(0, 3) as DayType)}>
      <RadioBtn $isActive={isActive} />
      <p className="day">{t("general.days", { context: translateCtx })}</p>
    </DayCellLayout>
  )
})
const DayCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .day {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
