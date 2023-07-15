import styled from "styled-components"
import React, { FC } from "react"
import { Header } from "@widgets/Header/ui/Header.tsx"
import { Footer } from "@widgets/Footer"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <LayoutStyles>
      <Header />
      {children}
      <Footer />
    </LayoutStyles>
  )
}
export default Layout
const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: aqua;
  height: 100vh;
  max-width: 450px;
  position: relative;
  overflow-y: hidden;
  margin: 0 auto;
`
