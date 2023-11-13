import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import React, { FC } from "react"
import styled from "styled-components"
import { Currency } from "@entities/Currency/types.ts"

interface props {
  fullName: string
  shortName: Currency
  isActive: boolean
  OnClick?: () => void
}

export const CurrencyCell: FC<props> = ({ fullName, shortName, isActive, OnClick }) => {

  return <CurrencyCellLayout onClick={OnClick}>
    <div className={`radio ${isActive ? "active" : ""}`} />
    <p className="name">{fullName}</p>
    <p className="sign">{DefaultCurrencySigns.get(shortName)}</p>
  </CurrencyCellLayout>
}
const CurrencyCellLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;

  .active {
    position: relative;
    border-color: var(--bg-3) !important;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 75%;
      height: 75%;
      background-color: var(--bg-3);
      border-radius: 50%;
    }
  }

  .radio {
    width: 19px;
    height: 19px;
    margin-right: 13px;
    border-radius: 50%;
    border: #808080 solid 2.5px;
  }

  .name {
    color: var(--txt-5);
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