import styled from "styled-components"
import { OverviewMenu } from "@widgets/OverviewMenu/ui/OverviewMenu.tsx"
import { useGetTransByMenus } from "@entities/Transaction/model/useGetTransByMenus.tsx"
import { TransactionsMenu } from "@widgets/TransactionsMenu/ui/TransactionsMenu.tsx"
import React from "react"

export const OverviewSlider = () => {


  const transactionMenusData = useGetTransByMenus()


  return <SliderLayout id="slider">
    {transactionMenusData.map((menuData) => (
      <OverviewMenu key={menuData.menuId} {...menuData} />
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
