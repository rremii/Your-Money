import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { setChangeDateMenu, setChangeTitleMenu } from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { PickDateBtn } from "@widgets/DateMenu/ui/PickDateBtn.tsx"
import Category from "@shared/assets/LightTheme/categories.png"


export const DateMenu = () => {
  const dispatch = useAppDispatch()

  const isMenuOpen = useTypedSelector(state => state.CurTransaction.isChangeDateMenu)

  const CloseMenu = () => {
    dispatch(setChangeDateMenu(false))
  }
  return <>
    <Overlay onClick={(CloseMenu)}
             $isActive={true} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <DateLayout $isOpen={true}>
      <PickDateBtn title={"Select day"} img={Category} />
      <PickDateBtn title={"Yesterday"} img={Category} subTitle={"September 19"} />
      <PickDateBtn color={"red"} isActive={true} title={"Today"} img={Category} subTitle={"September 20"} />
    </DateLayout>
  </>
}
const DateLayout = styled(Modal)`
  z-index: 50;
  padding: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;


  .PickDateBtn:first-child {
    grid-column: span 2;
    border-bottom: 1px solid var(--bg-10);
  }


`