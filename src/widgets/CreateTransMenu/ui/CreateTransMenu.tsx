import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { NotesInput } from "@widgets/CreateTransMenu/ui/NotesInput.tsx"
import { ResultQuantity } from "@widgets/CreateTransMenu/ui/ResultQuantity.tsx"
import { InfoCell } from "@widgets/CreateTransMenu/ui/InfoCell.tsx"
import { Calculator } from "@widgets/CreateTransMenu/ui/Calculator.tsx"

import Categories from "@shared/assets/LightTheme/categories.png"

export const CreateTransMenu = () => {


  return <>
    <Overlay onClick={() => {
    }} $isActive={true} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />
    <CreateMenuLayout>
      <div className="category-account-info">
        <InfoCell icon={Categories} color={"#5C6AC0"} content={"Card"} iconRadius={"5px"} title={"From account"} />
        <InfoCell icon={Categories} color={"#795547"} content={"Shopping"} iconRadius={"50%"} title={"To category"} />
      </div>
      <ResultQuantity />
      <NotesInput />
      <Calculator />
    </CreateMenuLayout>
  </>
}
const CreateMenuLayout = styled.div`
  position: fixed;
  z-index: 50;
  background-color: red;
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
