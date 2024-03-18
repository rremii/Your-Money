import styled from "styled-components"
import React, { FC, useMemo } from "react"
import { DateMoneyCell } from "@widgets/OverviewMenu/ui/DateMoneyCell.tsx"
import { CategoryCell } from "@widgets/OverviewMenu/ui/CategoryCell.tsx"
import { BalanceBox } from "@widgets/OverviewMenu/ui/BalanceBox.tsx"
import { GetBarConfig } from "@widgets/OverviewMenu/model/GetBarConfig.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { SumAllTransactions } from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { ITransByMenu } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { IExtraInfo } from "@widgets/OverviewMenu/model/GetExtraInfoByMenus.ts"
import { FilterTransByType } from "@entities/Transaction/helpers/FilterTransByType.ts"
import { OverviewGraph } from "@widgets/OverviewMenu/ui/OverviewGraph.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { FillCategoriesWithTransactions } from "@entities/Transaction"
import { LoginRequiredMenu } from "@shared/ui/LoginRequiredMenu.tsx"

interface props extends ITransByMenu {
  extInfo: IExtraInfo[]
}

export const OverviewMenu: FC<props> = ({
  transactions,
  dateFrom,
  dateTo,
  dateGap,
  extInfo,
  menuId,
}) => {
  const dateFilter = useTypedSelector((state) => state.Date.dateFilter)
  const firstDay = useTypedSelector((state) => state.Settings.firstDay)
  const currencySign = useTypedSelector(
    (state) => state.Settings.curCurrencySign,
  )
  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const loginState = useTypedSelector((state) => state.Auth.isLoggedIn)

  const { observeRef } = useOnMenuSlide(dateGap, menuId, dateFrom)

  const { data: user } = GetMe.useQueryState()
  const { allCategories } = useCategory(user?.id)

  const { expCategories } = FilterCategoriesByType(allCategories)
  const { expTransactions, incTransactions } = useMemo(
    () => FilterTransByType(transactions),
    [transactions],
  )

  const filledCategories = FillCategoriesWithTransactions(
    expCategories,
    expTransactions,
  )

  const expTransQuantity = SumAllTransactions(expTransactions)
  const incTransQuantity = SumAllTransactions(incTransactions)

  const barConfig = useMemo(
    () =>
      GetBarConfig({
        categories: expCategories,
        transactions: expTransactions,
        dateFrom,
        dateTo,
        filter: dateFilter,
        firstDay,
      }),
    [dateFilter, dateFrom, dateTo, expTransactions, firstDay],
  )
  if (loginState !== "success")
    return <LoginRequiredMenu nodeRef={observeRef} />
  return (
    <MenuLayout ref={observeRef}>
      <BalanceBox
        currencySign={currencySign}
        formatStr={currencyFormat}
        expense={expTransQuantity}
        income={incTransQuantity}
      />
      <OverviewGraph {...barConfig} />
      <section className="date-money-box">
        {extInfo.map((extData, index) => (
          <DateMoneyCell
            formatStr={currencyFormat}
            currencySign={currencySign}
            key={index}
            {...extData}
          />
        ))}
      </section>
      <section className="categories-box">
        {filledCategories
          .sort((prev, cur) => (prev.quantity < cur.quantity ? 1 : -1))
          .map(({ name, quantity, color, icon }, index) => (
            <CategoryCell
              icon={icon}
              key={index}
              currencySign={currencySign}
              formatStr={currencyFormat}
              color={color}
              name={name}
              quantity={quantity || 0}
              percent={Math.abs(quantity / expTransQuantity) || 0}
            />
          ))}
      </section>
    </MenuLayout>
  )
}
const MenuLayout = styled.section`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  overflow-y: auto;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;
  padding-bottom: 15px;

  .categories-box {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .date-money-box {
    background-color: var(--sub-bg);

    width: 100%;
    display: flex;
  }
`
