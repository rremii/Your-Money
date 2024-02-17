import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"

interface props {
  language: string
  isActive: boolean
  OnClick: (language: string) => void
}

export const LanguageCell: FC<props> = memo(
  ({ language, isActive, OnClick }) => {
    return (
      <LanguageCellLayout onClick={() => OnClick(language)}>
        <RadioBtn $isActive={isActive} />
        <p className="language">{FullNameLanguages.get(language)}</p>
      </LanguageCellLayout>
    )
  },
)
const LanguageCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .language {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
