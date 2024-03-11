import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { startScreenType } from "@entities/Settings/types.ts"
import { useTranslation } from "react-i18next"

interface props {
  screen: startScreenType
  isActive: boolean
  OnClick: (screen: startScreenType) => void
}

export const ScreenCell: FC<props> = memo(({ screen, isActive, OnClick }) => {
  const { t } = useTranslation()

  const translateScreenPath = ("general." +
    screen.toLowerCase()) as "general.overview"
  return (
    <StartScreenCellLayout onClick={() => OnClick(screen)}>
      <RadioBtn $isActive={isActive} />
      <p className="screen">{t(translateScreenPath)}</p>
    </StartScreenCellLayout>
  )
})
const StartScreenCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .screen {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
