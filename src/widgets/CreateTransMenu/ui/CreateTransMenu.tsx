import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"

export const CreateTransMenu = () => {


  return <>
    <Overlay onClick={() => {
    }} $isActive={true} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />
    <CreateMenuLayout>
      qwe
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
`
