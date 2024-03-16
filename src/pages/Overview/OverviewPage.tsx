import styled from "styled-components"
import React from "react"
import { Header } from "@widgets/Header"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { OverviewSlider } from "@widgets/OverviewMenu/ui/OverviewSlider.tsx"
import { TopHeader } from "@widgets/Header/ui/TopHeader.tsx"
import { MainMenuPageLayout } from "@shared/ui/MainMenuPageLayout.tsx"

const OverviewPage = () => {
  return (
    <OverviewLayout>
      {/*<Header SubHeader={<DateSubHeader />} right={<img src={Categories} />} />*/}
      <Header>
        <TopHeader right={<img src={Categories} />} />
        <DateSubHeader />
      </Header>
      {/*<DateSubHeader />*/}
      <OverviewSlider />
    </OverviewLayout>
  )
}
export default OverviewPage
const OverviewLayout = styled(MainMenuPageLayout)`
  //width: 100%;
  //height: 100%;
  //max-height: calc(100vh - 55px);
  //display: flex;
  //flex-direction: column;
  //position: relative;
  //font-size: 30px;
  //background-color: var(--main-bg);
`
