import styled from "styled-components"
import { Header } from "@widgets/Header"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"
import { TransactionsSlider } from "@widgets/TransactionsMenu/ui/TransactionsSlider.tsx"
import { StartCreatingTrans } from "@features/StartCreatingTrans/ui/StartCreatingTrans.tsx"
import React from "react"
import { TopHeader } from "@widgets/Header/ui/TopHeader.tsx"
import { MainMenuPageLayout } from "@shared/ui/MainMenuPageLayout.tsx"

const TransactionsPage = () => {
  return (
    <TransactionsLayout>
      <Header>
        <TopHeader />
        <DateSubHeader />
      </Header>
      <TransactionsSlider />
      <StartCreatingTrans />
    </TransactionsLayout>
  )
}
export default TransactionsPage
const TransactionsLayout = styled(MainMenuPageLayout)`

`
