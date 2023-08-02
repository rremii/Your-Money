import styled from "styled-components"
import FamilyIcon from "@shared/assets/LightTheme/family.png"
import React, { useEffect, useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import { DoughnutProps } from "@widgets/CategoriesMenu/constants/DoughnutConfig.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { useInView } from "react-intersection-observer"
import { useGetTransByMenu } from "@entities/Transaction/model/useGetTransByMenu.tsx"


export const CategoriesSlider = () => {

  useGetTransByMenu()


  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) return
    const sliderWidth = ref.current.scrollWidth

    ref.current.scrollTo(sliderWidth / 2, 0)
  }, [ref])


  const transactionMenusData = useGetTransByMenu()


  return <CategoriesLayout ref={ref}>
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

