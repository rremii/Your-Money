import styled from "styled-components"
import React, { FC } from "react"
import { FullDays } from "@shared/constants/Days.ts"
import { Months } from "@shared/constants/Months.ts"

interface props {
  dateStr: string
}

export const TransDate: FC<props> = ({ dateStr }) => {

  const transDate = new Date(dateStr)

  const day = FullDays.get(transDate.getDay()) as string
  const year = transDate.getFullYear()
  const month = Months.get(transDate.getMonth()) as string
  const date = transDate.getDate()

  const resDate = `${day}, ${month.slice(0, 3)} ${date}, ${year}`.toUpperCase()

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
