import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { InfoCell } from "@widgets/CurTransMenu/ui/InfoCell.tsx"
import { ResultQuantity } from "@widgets/CurTransMenu/ui/ResultQuantity.tsx"
import { NotesInput } from "@widgets/CurTransMenu/ui/NotesInput.tsx"
import { TransDate } from "@widgets/CurTransMenu/ui/TransDate.tsx"
import { OptionsSection } from "@widgets/CurTransMenu/ui/OptionsSection.tsx"
import { Calculator } from "@widgets/CurTransMenu/ui/Calculator.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"

export const CurTransMenu = () => {


  return <>
    <Overlay onClick={() => {
    }}
             $isActive={true} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />
    <MenuLayout>
      <div className="category-account-info">
        <InfoCell icon={Categories} color={"#5C6AC0"} content={"Card"} iconRadius={"5px"} title={"From account"} />
        <InfoCell icon={Categories} color={"#795547"} content={"Shopping"} iconRadius={"50%"} title={"To category"} />
      </div>
      <ResultQuantity />
      <NotesInput />
      {/*<Calculator />*/}
      <TransDate date={new Date()} />
      <OptionsSection />
    </MenuLayout>
  </>
}
const MenuLayout = styled.div`
  position: fixed;
  z-index: 50;
  width: 100%;
  bottom: 0;
  max-width: 370px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;

  .category-account-info {
    display: flex;
  }
`
