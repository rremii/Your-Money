import styled from "styled-components"
import FamilyIcon from "@shared/assets/LightTheme/family.png"
import React, { useEffect, useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import { DoughnutProps } from "@widgets/CategoriesMenu/constants/DoughnutConfig.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { useInView } from "react-intersection-observer"
import { useGetTransByMenu } from "@entities/Transaction/model/useGetTransByMenu.tsx"
import useDebounce from "@shared/hooks/useDebounce.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { shiftTransMenuIdsLeft, shiftTransMenuIdsRight } from "@entities/Transaction/model/TransactionSlice.ts"

//TODO крч делаешь что бы добовляла несколько штук когда к границам подходишь чекаешь через скрол и инер видс,так даешь штук 20 , получается когда к ним будешь подходить ничего не будет перерендероваться а ток у границы единажды
export const CategoriesSlider = () => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth

    ref.current.scrollTo(sliderWidth / 2, 0)
  }, [ref])
  // useEffect(() => {
  //   if (!ref || !ref.current) return
  //   const sliderWidth = ref.current.scrollWidth
  //   const sliderWidth = ref.current.w
  // debugger
  // }, [ref])


  const OnScroll = () => {
    if (!ref || !ref.current) return
    const scrollWidth = ref.current.scrollWidth
    const width = ref.current.clientWidth
    const curScroll = ref.current.scrollLeft

    if (scrollWidth - curScroll < width * 3) {
      console.log("qwe")
      dispatch(shiftTransMenuIdsRight())
    }

    if (curScroll < width * 3) {
      console.log("qwe")
      dispatch(shiftTransMenuIdsLeft())
    }


  }

  const deboncedOnScroll = useDebounce(OnScroll, 100)


  const transactionMenusData = useGetTransByMenu()


  return <CategoriesLayout onScroll={deboncedOnScroll} ref={ref}>
    {transactionMenusData.map((menuData) => (
      <CategoryMenu key={menuData.menuId} {...menuData} />
    ))}
  </CategoriesLayout>
}
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

