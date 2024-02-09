import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"
import { CategoriesSlider } from "@widgets/CategoriesMenu/ui/CategoriesSlider.tsx"
import { StartEditCategories } from "@features/StartEditCategories/ui/StartEditCategories.tsx"
import { EditCategoriesSlider } from "@widgets/EditCategoriesMenu/ui/EditCategoriesSlider.tsx"
import { TopHeader } from "@widgets/Header/ui/TopHeader.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { EditCategoriesHeader } from "@widgets/Header/ui/EditCategoriesMenu/EditCategoriesHeader.tsx"
import { EditCategoriesSubHeader } from "@widgets/Header/ui/EditCategoriesMenu/EditCategoriesSubHeader.tsx"

//todo make it better
const CategoriesPage = () => {
  const isCategoriesEditMode = useTypedSelector(
    (state) => state.UI.Pages.categoryPage.isCategoriesEditMode,
  )

  return (
    <CategoriesLayout>
      <Header>
        {isCategoriesEditMode ? (
          <>
            <EditCategoriesHeader />
            <EditCategoriesSubHeader />
          </>
        ) : (
          <>
            <TopHeader right={<StartEditCategories />} />
            <DateSubHeader />
          </>
        )}
      </Header>
      <CategoriesSlider />
      <EditCategoriesSlider />
    </CategoriesLayout>
  )
}
export default CategoriesPage
const CategoriesLayout = styled.div`
  width: 100%;
  height: 100%;
  //flex: 1 1 auto;
  //max-height: calc(100vh);
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-2);

  main {
    //flex: 1 1 auto;
  }
`
