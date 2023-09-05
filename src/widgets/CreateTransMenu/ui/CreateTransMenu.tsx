import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { NotesInput } from "@widgets/CreateTransMenu/ui/NotesInput.tsx"
import { ResultQuantity } from "@widgets/CreateTransMenu/ui/ResultQuantity.tsx"
import { InfoCell } from "@widgets/CreateTransMenu/ui/InfoCell.tsx"
import { Calculator } from "@widgets/CreateTransMenu/ui/Calculator.tsx"

export const CreateTransMenu = () => {


  return <>
    <Overlay onClick={() => {
    }} $isActive={true} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />
    <CreateMenuLayout>
      <div className="category-account-info">
        <InfoCell />
        <InfoCell />
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
  max-width: 450px;
  bottom: 0;

  .category-account-info {

  }
`
