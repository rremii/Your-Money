import styled from "styled-components"
import React from "react"
import { TransactionsMenu } from "@widgets/TransactionsMenu/ui/TransactionsMenu.tsx"
import { useGetTransByMenus } from "@entities/Transaction/model/useGetTransByMenus.tsx"
import { useSlider } from "@entities/Transaction/model/useSlider.tsx"


//todo add slider layout to shared and do same to others
export const TransactionsSlider = () => {


  const { sliderRef, OnScroll } = useSlider()

  const transactionMenusData = useGetTransByMenus()

  return <SliderLayout id="slider" ref={sliderRef} onScroll={OnScroll}>
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