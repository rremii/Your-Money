import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"
import { startScreenType } from "@entities/Settings/types.ts"

interface props {
  screen: startScreenType
  isActive: boolean
  OnClick: (screen: startScreenType) => void
}

export const ScreenCell: FC<props> = memo(({ screen, isActive, OnClick }) => {
  return (
    <StartScreenCellLayout onClick={() => OnClick(screen)}>
      <RadioBtn $isActive={isActive} />
      <p className="screen">{screen}</p>
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
