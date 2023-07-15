import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { Footer } from "@widgets/Footer"

const CategoriesPage = () => {
  return (
    <CategoriesLayout>
      <Header right={<div>ri</div>} />
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
