import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, { memo, useCallback, useState } from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Calendar } from "@shared/modules/Calendar"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { setCurDate } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { useTranslation } from "react-i18next"

//todo make smth with todos like hide it or whatever in order them not to stay on the top lvl
export const CalendarMenu = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.calendarMenu.isOpen,
  )
  const initDate = useTypedSelector((state) => state.Date.curMenu.dateFrom)
  const color = useTypedSelector((state) => state.CurAccount.color)

  const [chosenDate, setChosenDate] = useState<string>(initDate)
  const { t } = useTranslation()

  const CloseCalendar = () => {
    dispatch(closeMenu("calendarMenu"))
  }

  const OnChosenDateChange = useCallback((dateStr: string) => {
    setChosenDate(dateStr)
  }, [])

  const OnSubmit = () => {
    const slider = document.querySelector("#slider")
    if (!slider) return

    const sliderWidth = slider.clientWidth * 11

    window.localStorage.setItem("scroll", String(sliderWidth / 2 - 200))
    dispatch(setCurDate(chosenDate))
    CloseCalendar()
  }

  return (
    <>
      <Overlay
        onClick={CloseCalendar}
        $isActive={isOpen}
        $zIndex={60}
        $color={"rgba(0, 0, 0, 0.5 )"}
      />
      <CalendarMenuLayout $color={color} $isOpen={isOpen}>
        <Calendar
          color={color}
          OnChange={OnChosenDateChange}
          initialDate={initDate}
        />
        <div className="btn-box">
          <button onClick={CloseCalendar} className="cancel">
            {t("general.buttons.cancel")}
          </button>
          <button onClick={OnSubmit} className="submit">
            {t("general.buttons.ok")}
          </button>
        </div>
      </CalendarMenuLayout>
    </>
  )
})
const CalendarMenuLayout = styled(Modal)<{
  $color?: string
}>`
  padding: 0;
  z-index: 60;

  .btn-box {
    display: flex;
    align-items: center;
    gap: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    padding-right: 25px;

    .cancel,
    .submit {
      color: ${({ $color }) => ($color ? $color : "#4D5586")};
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .cancel {
    }

    .submit {
    }
  }

  .react-calendar {
    width: 100%;
    background-color: white;
    color: #222;
    font-family: Inter, sans-serif;
    line-height: 1.125em;
  }

  abbr[title] {
    text-decoration: none;
  }
`
