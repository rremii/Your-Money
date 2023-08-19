import styled from "styled-components"
import React, { FC } from "react"
import { DateMoneyCell } from "@widgets/OverviewMenu/ui/DateMoneyCell.tsx"
import { CategoryCell } from "@widgets/OverviewMenu/ui/CategoryCell.tsx"
import { BalanceBox } from "@widgets/OverviewMenu/ui/BalanceBox.tsx"
import { Bar } from "react-chartjs-2"
import { GetBarConfig } from "@widgets/OverviewMenu/model/GetBarConfig.ts"
import { expCategories } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { SumAllTransactions } from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"
import { FillCategoriesWithTransactions } from "@entities/Transaction/helpers/FillCategoriesWithTransactions.ts"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { ITransByMenu } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { IExtraInfo } from "@widgets/OverviewMenu/model/GetExtraInfoByMenus.ts"
import { FilterTransByType } from "@entities/Transaction/helpers/FilterTransByType.ts"


interface props extends ITransByMenu {
  extInfo: IExtraInfo[]
}

export const OverviewMenu: FC<props> = ({ transactions, dateFrom, dateTo, dateGap, extInfo, menuId }) => {
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)

  const { expTransactions, incTransactions } = FilterTransByType(transactions)

  const { observeRef } = useOnMenuSlide(dateGap, menuId)

  const expTransQuantity = SumAllTransactions(expTransactions)
  const incTransQuantity = SumAllTransactions(incTransactions)


  const barConfig = GetBarConfig({
    categories,
    transactions: expTransactions,
    dateFrom,
    dateTo,
    filter: dateFilter,
    firstDay
  })
  const filledCategories = FillCategoriesWithTransactions(expCategories, expTransactions)


  return <MenuLayout ref={observeRef}>
    <BalanceBox expense={expTransQuantity} income={incTransQuantity} />
    <div className="overview-graph">
      <Bar {...barConfig} />
    </div>
    <div className="date-money-box">
      {extInfo.map((extData, index) => (
        <DateMoneyCell key={index} {...extData} />
      ))}
    </div>
    <div className="categories-box">
      {filledCategories
        .sort((prev, cur) => prev.quantity < cur.quantity ? 1 : -1)
        .map(({ name, quantity, color }, index) => (
          <CategoryCell key={index} currency={"Br"} color={color} name={name} quantity={quantity || 0}
                        percent={Math.abs(quantity / expTransQuantity) || 0} />
        ))}
    </div>
  </MenuLayout>
}
const MenuLayout = styled.div`
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
    background-color: var(--bg-1);

    width: 100%;
    display: flex;

    //display: grid;
    //grid-template-columns: 1fr 1fr 1fr;
    //grid-template-rows: 1fr;
  }


  .overview-graph {
    width: 100%;
    background-color: var(--bg-1);
    //height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    canvas {
      //height: 50px;
      width: 97% !important;
    }
  }


`