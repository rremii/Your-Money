import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import React, { FC } from "react"
import styled from "styled-components"
import { Currency } from "@entities/Currency/types.ts"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"

interface props {
  fullName: string
  shortName: Currency
  isActive: boolean
  OnClick?: () => void
}

export const CurrencyCell: FC<props> = ({
  fullName,
  shortName,
  isActive,
  OnClick,
}) => {
  return (
    <CurrencyCellLayout onClick={OnClick}>
      <RadioBtn $isActive={isActive} />
      <p className="name">{fullName}</p>
      <p className="sign">{DefaultCurrencySigns.get(shortName)}</p>
    </CurrencyCellLayout>
  )
}
const CurrencyCellLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;

  .name {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .sign {
    flex: 1 1 auto;
    text-align: right;
    color: var(--txt-6);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
