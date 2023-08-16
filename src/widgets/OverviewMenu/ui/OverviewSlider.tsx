import styled from "styled-components"
import { OverviewMenu } from "@widgets/OverviewMenu/ui/OverviewMenu.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import React, { memo } from "react"
import { useSlider } from "@entities/Transaction/model/useSlider.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"

export const OverviewSlider = memo(() => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)

  const { transactions } = useGetTransactions()


  const { sliderRef, OnScroll } = useSlider()


  const transactionMenusData = GetTransByMenus({
    transactions, dateFilter, dateMenuIds, firstDay
  })

  console.log("qwe")

  return <SliderLayout ref={sliderRef} onScroll={OnScroll} id="slider">
    {transactionMenusData.map((menuData) => (
      <OverviewMenu key={menuData.menuId} {...menuData} />
    ))}
  </SliderLayout>
})
const SliderLayout = styled.main`
  //background-color: var(--bg-1);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

`
