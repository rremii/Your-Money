import React, { useCallback, useState } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  closeMenu,
  setCurrencyMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { setCurCurrencySign } from "@entities/Settings/model/SettingsSlice.ts"
import { CurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { CurrencySignCell } from "@features/DefaultCurrencyModal/ui/CurrencySignCell.tsx"

export const CurrencySignMenu = () => {
  const dispatch = useAppDispatch()

  const currency = useTypedSelector((state) => state.Settings.curCurrency)
  const curCurrencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )

  const [chosenCurrencySign, setCurrencySign] =
    useState<string>(curCurrencySign)

  const SetChosenCurrencySign = useCallback((currencySign: string) => {
    setCurrencySign(currencySign)
  }, [])
  const OnSubmit = () => {
    dispatch(setCurCurrencySign(chosenCurrencySign))
    dispatch(closeMenu("currencyMenu"))
    dispatch(setCurrencyMenuType("currency"))
  }
  const GoToCurrencyMenu = () => {
    dispatch(setCurrencyMenuType("currency"))
  }

  return (
    <div>
      <div className="currencies-box">
        {CurrencySigns[currency].map((sign, index) => (
          <CurrencySignCell
            OnClick={SetChosenCurrencySign}
            sign={sign}
            isActive={chosenCurrencySign === sign}
            key={index}
          />
        ))}
      </div>
      <div className="btn-section">
        <button className="gray" onClick={GoToCurrencyMenu} type="button">
          Back
        </button>
        <button className="gray" onClick={OnSubmit} type="submit">
          Done
        </button>
      </div>
    </div>
  )
}
