import styled from "styled-components"
import React, { FC, useMemo } from "react"
import { TransactionHeader } from "@widgets/TransactionsMenu/ui/TransactionHeader.tsx"
import { TransactionSectionByDate } from "@widgets/TransactionsMenu/ui/TransactionSectionByDate.tsx"
import { GetTransactionsMenuData } from "@widgets/TransactionsMenu/model/GetTransactionsMenuData.ts"
import { ITransaction } from "@entities/Transaction/types.ts"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { MenuWithHistory } from "@widgets/TransactionsMenu/model/AddHistoryPointsToMenus.ts"

interface props extends MenuWithHistory {

}

export const TransactionsMenu: FC<props> = ({ transactions, dateGap, dateFrom, menuId, startBalance, endBalance }) => {

  const { observeRef } = useOnMenuSlide(dateGap, menuId, dateFrom)

  const transactionsMenuData = useMemo(() => GetTransactionsMenuData(transactions), [transactions])

  return <TransactionsLayout ref={observeRef}>
    <TransactionHeader startBalance={startBalance} endBalance={endBalance} />
    {transactionsMenuData.map((sectionData) => (
      <TransactionSectionByDate key={sectionData.date.getDate()} {...sectionData} />
    ))}
  </TransactionsLayout>
}
const TransactionsLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  overflow-y: auto;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;



`