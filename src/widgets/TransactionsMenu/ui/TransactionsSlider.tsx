import styled from "styled-components"
import React, { useEffect } from "react"
import { TransactionsMenu } from "@widgets/TransactionsMenu/ui/TransactionsMenu.tsx"
import { useGetTransByMenus } from "@entities/Transaction/model/useGetTransByMenus.tsx"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"

export const TransactionsSlider = () => {


  const transactionMenusData = useGetTransByMenus()

  useEffect(() => {
    console.log(transactionMenusData)
    // debugger
  }, [transactionMenusData])
  return <SliderLayout>

    {transactionMenusData.map((menuData) => (
      <TransactionsMenu key={menuData.menuId} {...menuData} />
    ))}
  </SliderLayout>
}
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