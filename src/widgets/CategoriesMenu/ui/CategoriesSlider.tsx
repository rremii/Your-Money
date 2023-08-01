import styled from "styled-components"
import FamilyIcon from "@shared/assets/LightTheme/family.png"
import React, { useEffect, useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import { DoughnutProps } from "@widgets/CategoriesMenu/constants/DoughnutConfig.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"


export const CategoriesSlider = () => {


  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth

    ref.current.scrollTo(sliderWidth / 2, 0)
  }, [ref])

  return <CategoriesLayout ref={ref}>
    <CategoryMenu />
    <CategoryMenu />
    <CategoryMenu />
    <CategoryMenu />
    <CategoryMenu />

  </CategoriesLayout>
}
const CategoriesLayout = styled.main`
  background-color: var(--bg-1);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  //scroll-behavior: smooth;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`

