import styled from "styled-components"
import { CategorySliderMenu } from "@widgets/ChooseCategorySlideMenu/ui/CategorySliderMenu.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"

export const ChooseCategorySlider = () => {

  const allCategories = useTypedSelector(state => state.Category.allCategories)

  const { incCategories, expCategories } = FilterCategoriesByType(allCategories)

  return <CategorySliderLayout>
    <CategorySliderMenu categories={incCategories} />
    <CategorySliderMenu categories={expCategories} />
  </CategorySliderLayout>
}
const CategorySliderLayout = styled.div`

  width: 100%;
  display: flex;
  scroll-snap-stop: always;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

`