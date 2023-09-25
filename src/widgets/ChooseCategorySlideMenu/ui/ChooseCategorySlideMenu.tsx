import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { CategorySlideHeader } from "@widgets/ChooseCategorySlideMenu/ui/CategorySlideHeader.tsx"
import { ChooseCategorySlider } from "@widgets/ChooseCategorySlideMenu/ui/ChooseCategorySlider.tsx"

export const ChooseCategorySlideMenu = () => {
  return <>
    <Overlay onClick={() => {
    }}
             $isActive={true} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <CategorySlideMenuLayout $isOpen={true}>
      <CategorySlideHeader scrollPercent={0} activeType={"income"} />
      <ChooseCategorySlider />
    </CategorySlideMenuLayout>
  </>
}
const CategorySlideMenuLayout = styled(Modal)`
  z-index: 50;
  width: 100%;
  max-width: 370px;

  padding: 0;
`