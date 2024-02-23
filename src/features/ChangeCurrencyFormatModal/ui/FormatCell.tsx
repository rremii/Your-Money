import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props {
  format: string
  currencySign: string
  isActive: boolean
  OnClick: (format: string) => void
}

export const FormatCell: FC<props> = memo(
  ({ format, isActive, OnClick, currencySign }) => {
    const exampleNumber = -12554254.2
    return (
      <FormatCellLayout onClick={() => OnClick(format)}>
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
  },
)
const FormatCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .format {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
