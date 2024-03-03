import styled from "styled-components"
import { CategorySliderMenu } from "@features/ChooseCategorySlideMenu/ui/CategorySliderMenu.tsx"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { FC, useEffect, useRef } from "react"

interface props {
  onScroll: (scroll: number) => void
}

export const ChooseCategorySlider: FC<props> = ({ onScroll }) => {
  const { data: user } = GetMe.useQueryState()
  const { allCategories } = useCategory(user?.id)

  const { incCategories, expCategories } = FilterCategoriesByType(allCategories)

  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    OnScroll()
  }, [])

  const OnScroll = () => {
    if (!sliderRef || !sliderRef.current) return
    const width = sliderRef.current.clientWidth
    const curScroll = sliderRef.current.scrollLeft

    const scrollPercent = Math.round(curScroll / width) * 100

    if (scrollPercent > 50) {
      onScroll(scrollPercent)
    }
    if (scrollPercent <= 50) {
      onScroll(scrollPercent)
    }
  }

  return (
    <CategorySliderLayout onScroll={OnScroll} ref={sliderRef}>
      <CategorySliderMenu categories={incCategories} />
      <CategorySliderMenu categories={expCategories} />
    </CategorySliderLayout>
  )
}
const CategorySliderLayout = styled.div`
  width: 100%;
  display: flex;
  scroll-snap-stop: always;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`
