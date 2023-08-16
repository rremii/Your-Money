import styled from "styled-components"
import React, { memo } from "react"
import { useSlider } from "@entities/Transaction/model/useSlider.tsx"


//todo add optimization to everywhere
export const CategoriesSlider = memo(() => {


  const { sliderRef, OnScroll } = useSlider()

  // const transactionMenusData = useGetTransByMenus()


  return <CategoriesLayout id="slider" onScroll={OnScroll} ref={sliderRef}>
    {/*{transactionMenusData.map((menuData) => (*/}
    {/*  <CategoryMenu key={menuData.menuId} {...menuData} />*/}
    {/*))}*/}
  </CategoriesLayout>
})
const CategoriesLayout = styled.main`
  background-color: var(--bg-1);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`

