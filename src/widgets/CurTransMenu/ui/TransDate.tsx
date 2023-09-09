import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { FC } from "react"
import { NotesInput } from "@widgets/CreateTransMenu/ui/NotesInput.tsx"
import { ResultQuantity } from "@widgets/CreateTransMenu/ui/ResultQuantity.tsx"
import { InfoCell } from "@widgets/CreateTransMenu/ui/InfoCell.tsx"
import { Calculator } from "@widgets/CreateTransMenu/ui/Calculator.tsx"

import Categories from "@shared/assets/LightTheme/categories.png"
import { FullDays, Months } from "@shared/helpers/TimeGap.ts"

interface props {
  date: Date
}

export const TransDate: FC<props> = ({ date }) => {

  const day = FullDays.get(date.getDay()) as string
  const year = date.getFullYear()
  const month = Months.get(date.getMonth()) as string
  const dateStr = date.getDate()

  const resDate = `${day}, ${month.slice(0, 3)} ${dateStr}, ${year}`.toUpperCase()

  return <TransDateLayout>
    {resDate}
  </TransDateLayout>

}
const TransDateLayout = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-14);
  padding: 5px 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-size: 12px;
  color: var(--txt-6);
  border: 1px solid var(--bg-13);
`
