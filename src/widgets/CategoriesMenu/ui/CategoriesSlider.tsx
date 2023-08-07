import styled from "styled-components"
import React, { useEffect, useRef } from "react"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { useGetTransByMenus } from "@entities/Transaction/model/useGetTransByMenus.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { shiftTransMenuIdsLeft, shiftTransMenuIdsRight } from "@entities/DateSlider/model/DateSliderSlice.ts"

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
    const scrollDif = scrollWidth - curScroll - width


    if (scrollDif === 0) {
      dispatch(shiftTransMenuIdsRight({ shiftAmount: 2 }))
      ref.current.scrollBy(width * 2, 0)
    }

    if (curScroll === 0) {
      dispatch(shiftTransMenuIdsLeft({ shiftAmount: 2 }))
      ref.current.scrollTo(0, 0)
    }


  }


  const transactionMenusData = useGetTransByMenus()


  return <CategoriesLayout className="slider" onScroll={OnScroll} ref={ref}>
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

