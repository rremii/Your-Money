import styled from "styled-components"
import React, { memo } from "react"
import { TransactionsMenu } from "@widgets/TransactionsMenu/ui/TransactionsMenu.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { useSlider } from "@entities/DateSlider/model/useSlider.tsx"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"


//todo add slider layout to shared and do same to others
export const TransactionsSlider = memo(() => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)


  const { allTransactions } = useGetTransactions()

  const { sliderRef, OnScroll } = useSlider()

  const transByMenus = GetTransByMenus({
    allTransactions, dateFilter, dateMenuIds, firstDay
  })


  return <SliderLayout id="slider" ref={sliderRef} onScroll={OnScroll}>
    {transByMenus.map((menuData) => (
      <TransactionsMenu key={menuData.menuId} {...menuData} />
    ))}
  </SliderLayout>
})
const SliderLayout = styled.main`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

`