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
import { MainMenuPageLayout } from "@shared/ui/MainMenuPageLayout.tsx"

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
const CategoriesLayout = styled(MainMenuPageLayout)`
  //width: 100%;
  //height: 100%;
  //max-height: calc(100vh - 55px);
  //display: flex;
  //flex-direction: column;
  //position: relative;
  //font-size: 30px;
  //background-color: #ececec;
`
