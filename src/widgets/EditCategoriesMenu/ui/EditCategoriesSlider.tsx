import styled from "styled-components"
import React, { memo, useEffect, useMemo, useRef } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { SliderLayout } from "@shared/ui/Slider.tsx"
import { EditCategoriesMenu } from "@widgets/EditCategoriesMenu/ui/EditCategoriesMenu.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"
import { setNewCategoryType } from "@entities/Category/model/NewCategorySlice.ts"

export const EditCategoriesSlider = memo(() => {
  const dispatch = useAppDispatch()

  const isEditMode = useTypedSelector(
    (state) => state.UI.Pages.categoryPage.isCategoriesEditMode,
  )

  const { data: user } = GetMe.useQueryState()
  const { allCategories } = useCategory(user?.id)
  const { expCategories, incCategories } = useMemo(
    () => FilterCategoriesByType(allCategories),
    [allCategories],
  )

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
      dispatch(setNewCategoryType("income"))
    }
    if (scrollPercent <= 50) {
      dispatch(setNewCategoryType("expense"))
    }
  }

  return (
    <EditCategoriesLayout
      onScroll={OnScroll}
      ref={sliderRef}
      $isHidden={!isEditMode}
    >
      <EditCategoriesMenu categoryType="expense" categories={expCategories} />
      <EditCategoriesMenu categoryType="income" categories={incCategories} />
    </EditCategoriesLayout>
  )
})
const EditCategoriesLayout = styled(SliderLayout)<{
  $isHidden?: boolean
}>`
  position: absolute;

  pointer-events: ${({ $isHidden }) => ($isHidden ? "none" : "initial")};
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  transition: opacity 0.4s;

  height: calc(100vh - 0px - 95px); // - footer - header
  top: 95px;
  background-color: white;

  z-index: 1;
`
