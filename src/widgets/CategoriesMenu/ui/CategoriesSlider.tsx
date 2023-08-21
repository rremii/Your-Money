import styled from "styled-components"
import React, { memo } from "react"
import { useSlider } from "@entities/Transaction/model/useSlider.tsx"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"


//todo add optimization to everywhere
export const CategoriesSlider = memo(() => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)


  const { allTransactions } = useGetTransactions()

  const { sliderRef, OnScroll } = useSlider()

  const transByMenus = GetTransByMenus({
    allTransactions, dateFilter, dateMenuIds, firstDay
  })


  return <CategoriesLayout id="slider" onScroll={OnScroll} ref={sliderRef}>
    {transByMenus.map((menuData) => (
      <CategoryMenu key={menuData.menuId} {...menuData} />
    ))}
  </CategoriesLayout>
})
const CategoriesLayout = styled.main`
  background-color: var(--bg-1);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`

