import styled from "styled-components"
import FamilyIcon from "@shared/assets/LightTheme/family.png"
import React, { useEffect, useRef, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { DoughnutProps } from "@widgets/CategoriesMenu/constants/DoughnutConfig.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { useInView } from "react-intersection-observer"
import { useGetTransByMenu } from "@entities/Transaction/model/useGetTransByMenu.tsx"
import useDebounce from "@shared/hooks/useDebounce.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { shiftTransMenuIdsLeft, shiftTransMenuIdsRight } from "@entities/Transaction/model/TransactionSlice.ts"
import { flatten } from "@reduxjs/toolkit/dist/query/utils"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { callback } from "chart.js/helpers"

export const CategoriesSlider = () => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth

    ref.current.scrollTo(sliderWidth / 2, 0)
  }, [ref])


  const OnScroll = () => {
    if (!ref || !ref.current) return
    const scrollWidth = ref.current.scrollWidth
    const width = ref.current.clientWidth
    const curScroll = ref.current.scrollLeft
    const scrollDif = scrollWidth - curScroll


    const first = scrollDif < width * 3 + 3 && scrollDif < width * 3 - 3
    const second = scrollDif < width * 2 + 3 && scrollDif < width * 2 - 3
    if (first || second) {
      console.log("qwe")
      dispatch(shiftTransMenuIdsRight())
      ref.current.scrollTo(scrollWidth / 2, 0)
      // setAllowShift(false)
    }

    if (curScroll < 5) {
      console.log("qwe")
      dispatch(shiftTransMenuIdsLeft())

    }


  }


  const transactionMenusData = useGetTransByMenu()

  console.log(transactionMenusData)

  return <CategoriesLayout onScroll={OnScroll} ref={ref}>
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

