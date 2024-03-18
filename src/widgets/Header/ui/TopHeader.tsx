import styled from "styled-components"
import React, { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

interface props {
  right: React.ReactNode
}

export const TopHeader: FC<props> = ({ right }) => {
  const dispatch = useAppDispatch()

  const balance = useTypedSelector((state) => state.CurAccount.balance)
  const curAccId = useTypedSelector((state) => state.CurAccount.id)
  const curAccName = useTypedSelector((state) => state.CurAccount.name)
  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const currencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )

  const { t } = useTranslation()

  const OpenChangeAccountMenu = () => {
    dispatch(openMenu("changeAccountMenu"))
  }
  return (
    <TopHeaderLayout>
      <button onClick={OpenChangeAccountMenu} className="info center">
        <h2>{curAccId ? curAccName : t("topHeader.title")}</h2>
        <h1>
          {FormatCurrencyString({
            currencySign,
            quantity: balance,
            formatString: currencyFormat,
            sign: balance < 0 ? "-" : "",
          })}
        </h1>
      </button>
      <div className="right">{right}</div>
    </TopHeaderLayout>
  )
}
const TopHeaderLayout = styled.div`
  padding: 0 17px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 65px;
  align-items: center;
  display: grid;

  .info {
    cursor: pointer;
    grid-column: 2/3;
    justify-self: center;

    h2 {
      color: #ffffff;
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    h1 {
      color: #ffffff;
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 1px;
    }
  }

  .right {
    grid-column: 3/4;
    width: 20px;
    height: 20px;
    justify-self: right;
  }

  .right * {
    width: 100%;
    height: 100%;
  }
`
