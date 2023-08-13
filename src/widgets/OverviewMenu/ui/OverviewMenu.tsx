import styled from "styled-components"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import React, { FC, memo, useEffect } from "react"
import { DateMoneyCell } from "@widgets/OverviewMenu/ui/DateMoneyCell.tsx"
import { CategoryCell } from "@widgets/OverviewMenu/ui/CategoryCell.tsx"
import { BalanceBox } from "@widgets/OverviewMenu/ui/BalanceBox.tsx"
import { Bar } from "react-chartjs-2"
import { GetBarConfig } from "@widgets/OverviewMenu/model/GetBarConfig.ts"
import { ITransaction } from "@entities/Transaction/types.ts"
import { categories } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useInView } from "react-intersection-observer"
import { setDate } from "@entities/DateSlider/model/DateSliderSlice.ts"

interface props {
  menuId: number
  dateGap: string
  dateTo: Date
  dateFrom: Date
  transactions: ITransaction[]
}

export const OverviewMenu: FC<props> = ({ transactions, dateFrom, dateTo, dateGap, menuId }) => {
  const dispatch = useAppDispatch()


  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)

  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setDate(dateGap))

    const curScroll = document.querySelector("#slider")?.scrollLeft
    if (!curScroll) return
    window.localStorage.setItem("scroll", curScroll.toString())
  }, [inView])

  const barConfig = GetBarConfig({ categories, transactions, dateFrom, dateTo, filter: dateFilter, firstDay })


  return <MenuLayout ref={observeRef}>
    <BalanceBox />
    <div className="overview-graph">
      <Bar {...barConfig} />
    </div>
    <div className="date-money-box">
      <DateMoneyCell />
      <DateMoneyCell />
      <DateMoneyCell />
    </div>
    <div className="categories-box">
      <CategoryCell />
      <CategoryCell />
      <CategoryCell />
      <CategoryCell />
      <CategoryCell />
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
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