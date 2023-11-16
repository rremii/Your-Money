import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { SetDateToday } from "@widgets/DateMenu/ui/SetDateToday.tsx"
import { SetDateYesterday } from "@widgets/DateMenu/ui/SetDateYesterday.tsx"
import { OpenCalendar } from "@widgets/DateMenu/ui/OpenCalendar.tsx"
import { closeMenu } from "@entities/Modals/model/ModalsSlice.ts"


export const DateMenu = memo(() => {
  const dispatch = useAppDispatch()

  const isMenuOpen = useTypedSelector(state => state.Modals.dateMenu.isOpen)

  const CloseMenu = () => {
    dispatch(closeMenu("dateMenu"))
  }


  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isMenuOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <DateLayout $isOpen={isMenuOpen}>
      <OpenCalendar />
      <SetDateYesterday />
      <SetDateToday />
    </DateLayout>
  </>
})
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

  .PickDateBtn:nth-child(2) {
    border-right: 1px solid var(--bg-10);
  }

  .PickDateBtn:last-child {
    border-left: 1px solid var(--bg-10);
  }



`