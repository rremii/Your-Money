import styled from "styled-components"
import React, { memo } from "react"
import { useSlider } from "@entities/DateSlider/model/useSlider.tsx"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { SliderLayout } from "@shared/ui/Slider.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"

export const CategoriesSlider = memo(() => {
  const dateMenuIds = useTypedSelector((state) => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector((state) => state.Date.dateFilter)
  const firstDay = useTypedSelector((state) => state.Settings.firstDay)
  const initDate = useTypedSelector((state) => state.Date.initDate)

  const { data: user } = GetMe.useQueryState()
  const { accountIds, getAccountById } = useAccount(user?.id)
  const { allTransactions } = useGetTransactions(accountIds, getAccountById)

  const { sliderRef, OnScroll } = useSlider(dateFilter, dateMenuIds)

  const transByMenus = GetTransByMenus({
    allTransactions,
    dateFilter,
    dateMenuIds,
    firstDay,
    initDate,
  })

  return (
    <CategoriesLayout id="slider" onScroll={OnScroll} ref={sliderRef}>
      {transByMenus.map((menuData) => (
        <CategoryMenu key={menuData.menuId} {...menuData} />
      ))}
    </CategoriesLayout>
  )
})
const CategoriesLayout = styled(SliderLayout)`
  background-color: white;
`
