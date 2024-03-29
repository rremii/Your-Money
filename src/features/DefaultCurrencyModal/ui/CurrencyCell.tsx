import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import React, { FC, memo } from "react"
import styled from "styled-components"
import { Currency } from "@entities/Currency/types.ts"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"
import { useTranslation } from "react-i18next"

interface props {
  fullName: string
  shortName: Currency
  isActive: boolean
  OnClick: (currency: Currency) => void
}

export const CurrencyCell: FC<props> = memo(
  ({ fullName, shortName, isActive, OnClick }) => {
    const { t } = useTranslation()

    return (
      <CurrencyCellLayout onClick={() => OnClick(shortName)}>
        <RadioBtn $isActive={isActive} />
        <p className="name">{t("general.currency", { context: shortName })}</p>
        <p className="sign">{DefaultCurrencySigns.get(shortName)}</p>
      </CurrencyCellLayout>
    )
  },
)
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
    color: #818181;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
