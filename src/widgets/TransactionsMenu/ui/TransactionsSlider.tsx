import styled from "styled-components"
import React, { memo } from "react"
import { TransactionsMenu } from "@widgets/TransactionsMenu/ui/TransactionsMenu.tsx"
import { useGetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { useSlider } from "@entities/Transaction/model/useSlider.tsx"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"


//todo add slider layout to shared and do same to others
export const TransactionsSlider = memo(() => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)

  const { transactions: allTransactions } = useGetTransactions()


  const { sliderRef, OnScroll } = useSlider()

  // const transactionMenusData = useGetTransByMenus(allTransactions)

  return <SliderLayout id="slider" ref={sliderRef} onScroll={OnScroll}>
    {/*{transactionMenusData.map((menuData) => (*/}
    {/*  <TransactionsMenu key={menuData.menuId} {...menuData} />*/}
    {/*))}*/}
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