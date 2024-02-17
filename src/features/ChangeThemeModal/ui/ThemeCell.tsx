import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"
import { themeType } from "@entities/Settings/model/SettingsSlice.ts"

interface props {
  theme: themeType
  isActive: boolean
  OnClick: (theme: themeType) => void
}

export const ThemeCell: FC<props> = memo(({ theme, isActive, OnClick }) => {
  return (
    <ThemeCellLayout onClick={() => OnClick(theme)}>
      <RadioBtn $isActive={isActive} />
      <p className="theme">{theme}</p>
    </ThemeCellLayout>
  )
})
const ThemeCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .theme {
    text-transform: capitalize;
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
