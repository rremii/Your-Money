import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"
import Categories from "/icons/general/categories.svg"
import { OverviewSlider } from "@widgets/OverviewMenu/ui/OverviewSlider.tsx"
import { TopHeader } from "@widgets/Header/ui/TopHeader.tsx"
import { MainMenuPageLayout } from "@shared/ui/MainMenuPageLayout.tsx"

const OverviewPage = () => {
  return (
    <OverviewLayout>
      <Header>
        <TopHeader />
        <DateSubHeader />
      </Header>
      <OverviewSlider />
    </OverviewLayout>
  )
}
export default OverviewPage
const OverviewLayout = styled(MainMenuPageLayout)`
`
