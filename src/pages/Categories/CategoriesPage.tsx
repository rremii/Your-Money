import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import Categories from "@shared/assets/LightTheme/categories.png"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"

const CategoriesPage = () => {
  return (
    <CategoriesLayout>
      <Header
        SubHeader={<DateSubHeader />}
        right={<img src={Categories} alt="" />}
      />
      <main>categories</main>
    </CategoriesLayout>
  )
}
export default CategoriesPage
const CategoriesLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-2);

  main {
    flex: 1 1 auto;
  }
`
