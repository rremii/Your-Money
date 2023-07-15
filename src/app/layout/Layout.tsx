import styled from "styled-components"
import React, { FC } from "react"
import { Footer } from "@widgets/Footer"
import { Header } from "@widgets/Header"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <LayoutStyles>
      {/*<Header right={<div>right</div>} />*/}
      {children}
      <Footer />
    </LayoutStyles>
  )
}
export default Layout
const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 450px;
  position: relative;
  overflow-y: hidden;
  margin: 0 auto;
`
