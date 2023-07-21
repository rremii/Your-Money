import React, { FC } from "react"
import { Footer } from "@widgets/Footer"
import { SideBar } from "@widgets/Sidebar"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <SideBar />
      {children}
      <Footer />
    </>
  )
}
export default Layout
