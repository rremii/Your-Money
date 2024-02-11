import React, { FC } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"

interface props {
  format: string
  isActive: boolean
  OnClick?: () => void
}

export const FormatCell: FC<props> = ({ format, isActive, OnClick }) => {
  return (
    <FormatCellLayout onClick={OnClick}>
      <RadioBtn $isActive={isActive} />
      <p className="format">{format}</p>
    </FormatCellLayout>
  )
}
const FormatCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .format {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
