import styled from "styled-components"
import React, { FC } from "react"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <LayoutStyles>
      {/*<Header right={<div>right</div>} />*/}
      {/*<SideBar />*/}
      {children}
      {/*<Footer />*/}
    </LayoutStyles>
  )
}
export default AppLayout
const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 450px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`
