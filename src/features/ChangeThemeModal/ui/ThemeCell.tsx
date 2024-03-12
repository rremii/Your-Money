import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { themeType } from "@entities/Settings/types.ts"
import { useTranslation } from "react-i18next"

interface props {
  theme: themeType
  isActive: boolean
  OnClick: (theme: themeType) => void
}

export const ThemeCell: FC<props> = memo(({ theme, isActive, OnClick }) => {
  const { t } = useTranslation()

  return (
    <ThemeCellLayout onClick={() => OnClick(theme)}>
      <RadioBtn $isActive={isActive} />
      <p className="theme">{t("general.themes", { context: theme })}</p>
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
