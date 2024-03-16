import styled from "styled-components"
import React, { FC, memo } from "react"
import { Days } from "@shared/constants/Days.ts"
import { Months } from "@shared/constants/Months.ts"
import { useTranslation } from "react-i18next"

interface props {
  dateStr: string
}

export const TransDate: FC<props> = memo(({ dateStr }) => {
  const transDate = new Date(dateStr)

  const { t } = useTranslation()

  const day = Days.get(transDate.getDay()) as string
  const year = transDate.getFullYear()
  const month = Months.get(transDate.getMonth()) as string
  const date = transDate.getDate()

  const resDate = `${t("general.days", { context: [day.toLowerCase()] })}, ${t(
    "general.months",
    { context: [month.slice(0, 3).toLowerCase()] },
  )} ${date}, ${year}`.toUpperCase()

  return <TransDateLayout>{resDate}</TransDateLayout>
})
const TransDateLayout = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sub-bg-2);
  padding: 5px 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-size: 12px;
  color: var(--pale-txt);
  border: 1px solid rgba(163, 162, 162, 0.13);
`
