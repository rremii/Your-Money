import React, { FC, memo } from "react"
import styled from "styled-components"
import { RadioBtn } from "@shared/ui/RadioBtn.tsx"

interface props {
  sign: string
  isActive: boolean
  OnClick: (currencySign: string) => void
}

export const CurrencySignCell: FC<props> = memo(
  ({ sign, isActive, OnClick }) => {
    return (
      <SignCellLayout onClick={() => OnClick(sign)}>
        <RadioBtn $isActive={isActive} />
        <p className="sign">{sign}</p>
      </SignCellLayout>
    )
  },
)
const SignCellLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .sign {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
