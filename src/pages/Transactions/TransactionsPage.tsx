import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import Categories from "@shared/assets/LightTheme/categories.png"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"

const TransactionsPage = () => {
  return (
    <TransactionsLayout>
      <Header
        SubHeader={<DateSubHeader />}
        right={<img src={Categories} alt="" />}
      />
      <main>transactions</main>
    </TransactionsLayout>
  )
}
export default TransactionsPage
const TransactionsLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //max-width: 450px;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-2);
  //overflow-x: hidden;
  main {
    flex: 1 1 auto;
  }
`
