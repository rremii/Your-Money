import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { CurrencyNames } from "@entities/Currency/constants/CurrencyNames.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const CurrencyCell = () => {
  const dispatch = useAppDispatch()

  const color = useTypedSelector((state) => state.NewAccount.color)
  const currency = useTypedSelector((state) => state.NewAccount.currency)
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateAccountMenu.menuType,
  )

  const { t } = useTranslation()

  const OnClick = () => {
    if (menuType === "create") dispatch(openMenu("accountCurrencyMenu"))
  }
  return (
    <CurrencyLayout onClick={OnClick} $color={color}>
      <h2 className="title">{t("accountMenu.sections.account.currency")}</h2>
      <p className="extra-info">
        {t("general.currency", { context: currency })} -{" "}
        {DefaultCurrencySigns.get(currency)}
      </p>
    </CurrencyLayout>
  )
}
const CurrencyLayout = styled.div<{
  $color: string
}>`
  padding: 10px 15px;
  background-color: var(--sub-bg);
  margin-bottom: 10px;
  box-shadow: 0 5px 5px -5px #0000003f;

  .title {
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: var(--sub-txt);
    margin-bottom: 7px;
  }

  .extra-info {
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: ${({ $color }) => $color || "black"};
  }
`
