import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { memo, useCallback } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { SideBarModalHeader } from "@shared/ui/SideBarModalHeader.tsx"
import { setWeekDay } from "@entities/Settings/model/SettingsSlice.ts"
import { DayType } from "@shared/constants/Days.ts"
import { DayCell } from "@features/ChangeFirstDayWeekModal/ui/DayCell.tsx"
import { Days } from "@features/ChangeFirstDayWeekModal/constants/Days.tsx"

export const WeekDayModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.firstWeekDayMenu.isOpen,
  )
  const curDay = useTypedSelector((state) => state.Settings.firstDay)

  const SetFirstWeekDay = useCallback((day: DayType) => {
    window.localStorage.setItem("firstDayWeek", day)
    dispatch(setWeekDay(day))
    CloseModal()
  }, [])

  const CloseModal = () => {
    dispatch(closeMenu("firstWeekDayMenu"))
  }

  return (
    <>
      <Overlay onClick={CloseModal} $zIndex={55} $isActive={isOpen} />
      <WeekDayModalLayout $isOpen={isOpen}>
        <SideBarModalHeader>First Day of week</SideBarModalHeader>
        <div className="days-box">
          {Days.map((day, index) => (
            <DayCell
              OnClick={SetFirstWeekDay}
              day={day}
              isActive={curDay === day.slice(0, 3)}
              key={index}
            />
          ))}
        </div>
      </WeekDayModalLayout>
    </>
  )
})
const WeekDayModalLayout = styled(Modal)`
  z-index: 55;
  max-width: 360px;
  padding: 20px 22px;
  background-color: var(--sub-bg-light);

  .days-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;

    max-height: 350px;
    overflow-y: auto;

    border-bottom: 1px solid var(--bg-11);

    padding-bottom: 20px;
  }
`
