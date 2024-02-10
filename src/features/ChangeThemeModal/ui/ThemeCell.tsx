import React, { FC } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"
import { themeType } from "@entities/Settings/model/SettingsSlice.ts"

interface props {
  theme: themeType
  isActive: boolean
  OnClick?: () => void
}

export const ThemeCell: FC<props> = ({ theme, isActive, OnClick }) => {
  return (
    <ThemeCellLayout onClick={OnClick}>
      <RadioBtn $isActive={isActive} />
      <p className="theme">{theme}</p>
    </ThemeCellLayout>
  )
}
const ThemeCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .theme {
    text-transform: capitalize;
    color: var(--txt-5);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
