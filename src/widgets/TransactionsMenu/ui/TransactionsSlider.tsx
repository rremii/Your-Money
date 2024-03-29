import React, { memo } from "react"
import { TransactionsMenu } from "@widgets/TransactionsMenu/ui/TransactionsMenu.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { useSlider } from "@entities/DateSlider/model/useSlider.tsx"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useAccountHistoryPoints } from "@entities/AccountHistoryPoint/model/useAccountHistoryPoints.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { AddHistoryPointsToMenus } from "@widgets/TransactionsMenu/model/AddHistoryPointsToMenus.ts"
import { SliderLayout } from "@shared/ui/Slider.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"

export const TransactionsSlider = memo(() => {
  const dateMenuIds = useTypedSelector((state) => state.Date.dateMenuIds)
  const dateFilter = useTypedSelector((state) => state.Date.dateFilter)
  const firstDay = useTypedSelector((state) => state.Settings.firstDay)
  const curAccountId = useTypedSelector((state) => state.CurAccount.id)
  const initDate = useTypedSelector((state) => state.Date.initDate)

  const { data: user } = GetMe.useQueryState()

  const { accountIds, getAccountById } = useAccount(user?.id)
  const { allTransactions } = useGetTransactions(accountIds, getAccountById)
  const { history } = useAccountHistoryPoints(accountIds, getAccountById)

  const { sliderRef, OnScroll } = useSlider(dateFilter, dateMenuIds)

  const transByMenus = GetTransByMenus({
    allTransactions,
    dateFilter,
    dateMenuIds,
    firstDay,
    initDate,
  })

  const menusWithHistory = AddHistoryPointsToMenus(
    transByMenus,
    history,
    curAccountId,
  )

  return (
    <SliderLayout id="slider" ref={sliderRef} onScroll={OnScroll}>
      {menusWithHistory.map((menuData) => (
        <TransactionsMenu key={menuData.menuId} {...menuData} />
      ))}
    </SliderLayout>
  )
})
