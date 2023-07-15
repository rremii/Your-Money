import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { Footer } from "@widgets/Footer"

const OverviewPage = () => {
  return (
    <OverviewLayout>
      <Header right={<div>ri</div>} />
      <main>overview</main>
    </OverviewLayout>
  )
}
export default OverviewPage
const OverviewLayout = styled.div`
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
