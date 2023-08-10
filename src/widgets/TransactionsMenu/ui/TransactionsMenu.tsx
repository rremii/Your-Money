import styled from "styled-components"
import React, { FC, useEffect } from "react"
import { TransactionHeader } from "@widgets/TransactionsMenu/ui/TransactionHeader.tsx"
import { TransactionSectionByDate } from "@widgets/TransactionsMenu/ui/TransactionSectionByDate.tsx"
import { useInView } from "react-intersection-observer"
import { setDate, setIndex } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { GetTransactionsMenuData } from "@entities/Transaction/helpers/GetTransactionsMenuData.ts"
import { ITransaction } from "@entities/Transaction/types.ts"

interface props {
  menuId: number
  dateGap: string
  transactions: ITransaction[]
}


export const TransactionsMenu: FC<props> = ({ transactions, dateGap, menuId }) => {
  const dispatch = useAppDispatch()

  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setDate(dateGap))
    dispatch(setIndex(menuId))
  }, [inView])


  const transactionsMenuData = GetTransactionsMenuData(transactions)

  return <TransactionsLayout ref={observeRef}>
    <TransactionHeader />
    {transactionsMenuData.sort((prev, cur) => prev.date < cur.date ? 1 : -1).map((sectionData) => (
      <TransactionSectionByDate key={sectionData.date.getDate()} {...sectionData} />
    ))}
  </TransactionsLayout>
}
const TransactionsLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  overflow-y: auto;
  //background-color: var(--bg-1);
  height: 100%;
  width: max-content;
  flex: 0 0 100%;



`