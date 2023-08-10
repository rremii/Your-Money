import styled from "styled-components"
import { Header } from "@widgets/Header"
import Categories from "@shared/assets/LightTheme/categories.png"
import { DateSubHeader } from "@widgets/Header/ui/DateSubHeader.tsx"
import { TransactionsSlider } from "@widgets/TransactionsMenu/ui/TransactionsSlider.tsx"

const TransactionsPage = () => {


  return (
    <TransactionsLayout>
      <Header
        SubHeader={<DateSubHeader />}
        right={<img src={Categories} alt="" />}
      />
      <TransactionsSlider />
    </TransactionsLayout>
  )
}
export default TransactionsPage
const TransactionsLayout = styled.div`
  width: 100%;
  height: 100%;
  //flex: 1 1 auto;
  max-height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-2);

`
