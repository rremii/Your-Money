import { OverviewMenu } from "@widgets/OverviewMenu/ui/OverviewMenu.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import React, { memo } from "react"
import { useSlider } from "@entities/DateSlider/model/useSlider.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { GetExtraInfoByMenus } from "@widgets/OverviewMenu/model/GetExtraInfoByMenus.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { SliderLayout } from "@shared/ui/Slider.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"


//todo try to move trans by ids and menu ext data to store
export const OverviewSlider = memo(() => {
  const dateMenuIds = useTypedSelector(state => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector(state => state.Date.dateFilter)
  const firstDay = useTypedSelector(state => state.Date.firstDay)


  const { data: user } = GetMe.useQueryState()
  const { accountIds } = useAccount(user?.id)
  const { allTransactions } = useGetTransactions(accountIds)


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

