import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, { useState } from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Calendar } from "@shared/modules/Calendar"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { setChangeDateMenu } from "@entities/Modals/model/ChangeDateMenuSlice.ts"
import { setCalendarMenu } from "@entities/Modals/model/CalendarMenuSlice.ts"

export const CalendarMenu = () => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.Modals.CalendarMenu.isOpen)
  const initialDate = useTypedSelector(state => state.EditCreateTransaction.Transaction.dateStr)
  const categoryColor = useTypedSelector(state => state.EditCreateTransaction.ChosenCategory.color)

  const [chosenDate, setChosenDate] = useState<string>(initialDate)


  const CloseCalendar = () => {
    dispatch(setCalendarMenu(false))
  }

  const OnChosenDateChange = (dateStr: string) => {
    setChosenDate(dateStr)
  }
  const OnSubmit = () => {
    dispatch(setEditTransDateStr(chosenDate))
    dispatch(setCalendarMenu(false))
    dispatch(setChangeDateMenu(false))
  }

  return <>
    <Overlay onClick={CloseCalendar}
             $isActive={isOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <CalendarMenuLayout $color={categoryColor} $isOpen={isOpen}>
      <Calendar color={categoryColor} OnChange={OnChosenDateChange} initialDate={initialDate} />
      <div className="btn-box">
        <button onClick={CloseCalendar} className="cancel">CANCEL</button>
        <button onClick={OnSubmit} className="submit">OK</button>
      </div>
    </CalendarMenuLayout>
  </>
}
const CalendarMenuLayout = styled(Modal)<{
  $color?: string
}>`
  z-index: 50;
  padding: 0;

  .btn-box {
    display: flex;
    align-items: center;
    gap: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    padding-right: 25px;


    .cancel, .submit {
      color: ${({ $color }) => $color ? $color : "#4D5586"};
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