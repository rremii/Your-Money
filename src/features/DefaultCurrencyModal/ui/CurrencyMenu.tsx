import styled from "styled-components"
import { CurrencyCell } from "@features/DefaultCurrencyModal/ui/CurrencyCell.tsx"
import React, { useCallback } from "react"
import {
  closeMenu,
  setCurrencyMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  setCurCurrency,
  setCurCurrencySign,
} from "@entities/Settings/model/SettingsSlice.ts"
import { Currency } from "@entities/Currency/types.ts"
import { MainCurrencies } from "@entities/Currency/constants/MainCurrencies.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { useTranslation } from "react-i18next"

export const CurrencyMenu = () => {
  const dispatch = useAppDispatch()

  const currency = useTypedSelector((state) => state.Settings.curCurrency)

  const { t } = useTranslation()

  const SetChosenCurrency = useCallback((currency: Currency) => {
    dispatch(setCurrencyMenuType("currencySign"))
    dispatch(setCurCurrency(currency))
    const defaultSign = DefaultCurrencySigns.get(currency) || ""
    dispatch(setCurCurrencySign(defaultSign))
  }, [])
  const OnSubmit = () => {
    dispatch(setCurCurrency(currency))
    CloseModal()
  }
  const CloseModal = () => {
    dispatch(closeMenu("currencyMenu"))
  }

  return (
    <CurrencyMenuLayout>
      <p className="subTitle">{t("defaultCurrencyMenu.subTitle")}</p>
      <div className="currencies-box">
        {MainCurrencies.map(({ fullName, shortName }, index) => (
          <CurrencyCell
            OnClick={SetChosenCurrency}
            fullName={fullName}
            shortName={shortName}
            isActive={currency === shortName}
            key={index}
          />
        ))}
      </div>
      <div className="btn-section">
        <button className="gray" onClick={CloseModal} type="button">
          {t("general.buttons.cancel")}
        </button>
        <button className="gray" onClick={OnSubmit} type="submit">
          {t("general.buttons.done")}
        </button>
      </div>
    </CurrencyMenuLayout>
  )
}
const CurrencyMenuLayout = styled.div`
  overflow-y: hidden;
  height: 100%;

  .currencies-box {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
  }
`
