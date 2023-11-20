import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"
import { CategoriesSlider } from "@widgets/CategoriesMenu/ui/CategoriesSlider.tsx"
import { StartEditCategories } from "@features/StartEditCategories/ui/StartEditCategories.tsx"
import { EditCategoriesSlider } from "@widgets/EditCategoriesMenu/EditCategoriesSlider.tsx"

const CategoriesPage = () => {
  return (
    <CategoriesLayout>
      <Header
        SubHeader={<DateSubHeader />}
        right={<StartEditCategories />}
      />
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
  max-height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-2);

  main {
    //flex: 1 1 auto;
  }
`
