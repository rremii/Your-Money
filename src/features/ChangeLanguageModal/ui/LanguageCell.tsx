import React, { FC } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"

interface props {
  language: string
  isActive: boolean
  OnClick?: () => void
}

export const LanguageCell: FC<props> = ({ language, isActive, OnClick }) => {
  return (
    <SignCellLayout onClick={OnClick}>
      <RadioBtn $isActive={isActive} />
      <p className="language">{FullNameLanguages.get(language)}</p>
    </SignCellLayout>
  )
}
const SignCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .language {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
