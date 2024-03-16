import styled from "styled-components"
import React, { FC, useMemo } from "react"
import { TransactionHeader } from "@widgets/TransactionsMenu/ui/TransactionHeader.tsx"
import { TransactionSectionByDate } from "@widgets/TransactionsMenu/ui/TransactionSectionByDate.tsx"
import { GetTransactionsMenuData } from "@widgets/TransactionsMenu/model/GetTransactionsMenuData.ts"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { MenuWithHistory } from "@widgets/TransactionsMenu/model/AddHistoryPointsToMenus.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { LoginRequiredMenu } from "@shared/ui/LoginRequiredMenu.tsx"
import { NoTransactionsSection } from "@widgets/TransactionsMenu/ui/NoTransactionsMenu.tsx"

type props = MenuWithHistory

export const TransactionsMenu: FC<props> = ({
  transactions,
  dateGap,
  dateFrom,
  menuId,
  startBalance,
  endBalance,
}) => {
  const { observeRef } = useOnMenuSlide(dateGap, menuId, dateFrom)
  const loginState = useTypedSelector((state) => state.Auth.isLoggedIn)

  const transactionsMenuData = useMemo(
    () => GetTransactionsMenuData(transactions),
    [transactions],
  )
  if (loginState !== "success")
    return <LoginRequiredMenu nodeRef={observeRef} />
  return (
    <TransactionsLayout ref={observeRef}>
      <TransactionHeader startBalance={startBalance} endBalance={endBalance} />
      {transactionsMenuData.length ? (
        transactionsMenuData.map((sectionData) => (
          <TransactionSectionByDate
            key={sectionData.date.getDate()}
            {...sectionData}
          />
        ))
      ) : (
        <NoTransactionsSection />
      )}
    </TransactionsLayout>
  )
}
const TransactionsLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  overflow-y: auto;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--main-bg);
`
