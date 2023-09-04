import styled from "styled-components"
import { OverviewMenu } from "@widgets/OverviewMenu/ui/OverviewMenu.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import React, { memo } from "react"
import { useSlider } from "@entities/DateSlider/model/useSlider.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { GetExtraInfoByMenus } from "@widgets/OverviewMenu/model/GetExtraInfoByMenus.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"


//todo try to move trans by ids and menu ext data to store
export const OverviewSlider = memo(() => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)


  const { data: user } = GetMe.useQueryState()
  const { allTransactions } = useGetTransactions(user?.id)


  const { sliderRef, OnScroll } = useSlider()


  const transByMenus = GetTransByMenus({
    allTransactions, dateFilter, dateMenuIds, firstDay
  })

  const menusExtraInfo = GetExtraInfoByMenus({
    allTransactions, dateFilter, dateMenuIds, firstDay
  })


  return <SliderLayout ref={sliderRef} onScroll={OnScroll} id="slider">
    {transByMenus.map((menuData, index) => (
      <OverviewMenu key={menuData.menuId} extInfo={menusExtraInfo[index]}  {...menuData} />
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
