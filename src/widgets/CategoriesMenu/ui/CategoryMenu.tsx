import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setDate, setIndex } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { GetCategoriesMenuData } from "@entities/Transaction/helpers/GetCategoriesMenuData.ts"
import { ICategory, ITransaction } from "@entities/Transaction/types.ts"
import { Category } from "@widgets/CategoriesMenu/ui/Category.tsx"
import { BalanceGraph } from "@widgets/CategoriesMenu/ui/BalanceGraph.tsx"


interface props {
  menuId: number
  dateGap: string
  transactions: ITransaction[]
}

export const categories: ICategory[] = [
  { name: "Family", color: "#A930FF" },
  { name: "Gifts", color: "#CF3648" },
  { name: "Groceries", color: "#32CFFF" },
  { name: "Health", color: "#46A33D" },
  { name: "Leisure", color: "#A33D6E" },
  { name: "Shopping", color: "#7B7475" },
  { name: "Restaurant", color: "#316CFF" },
  { name: "Transport", color: "#AF8A6D" }
]


export const CategoryMenu: FC<props> = React.memo(({ menuId, dateGap, transactions }) => {
  const dispatch = useAppDispatch()


  const [observeRef, inView] = useInView({
    threshold: 0.5
  })


  useEffect(() => {
    if (!inView) return
    dispatch(setDate(dateGap))
    dispatch(setIndex(menuId))
  }, [inView])


  const filledCategories = GetCategoriesMenuData(categories, transactions)


  return <CategoryLayout ref={observeRef}>
    <BalanceGraph categories={filledCategories} />
    {filledCategories.map((categoryData, i) => (
      <Category key={i} {...categoryData} />
    ))}
  </CategoryLayout>
})
const CategoryLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 15px;
  overflow-y: auto;
  background-color: var(--bg-1);
  display: grid;
  grid-template-rows: min-content min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;


`
