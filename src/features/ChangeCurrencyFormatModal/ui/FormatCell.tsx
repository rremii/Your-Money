import React, { FC } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FullNameLanguages } from "@entities/Settings/constants/FullNameLanguages.ts"
import { CurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  format: string
  currencySign: string
  isActive: boolean
  OnClick?: () => void
}

export const FormatCell: FC<props> = ({
  format,
  isActive,
  OnClick,
  currencySign,
}) => {
  const exampleNumber = -12554254.2
  return (
    <FormatCellLayout onClick={OnClick}>
      <RadioBtn $isActive={isActive} />
      <p className="format">
        {FormatCurrencyString({
          formatString: format,
          quantity: exampleNumber,
          currencySign,
          sign: "-",
        })}
      </p>
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
