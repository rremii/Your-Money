import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, { useEffect, useState } from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { Calendar } from "@features/Calendar/ui/Calendar.tsx"

export const CalendarMenu = () => {

  const [date, setDate] = useState([new Date(), new Date()])


  const OnChange = (date: Date[]) => {

  }

  return <>
    <Overlay onClick={() => {
    }}
             $isActive={true} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <CalendarMenuLayout $isOpen={true}>
      <Calendar />
      <div className="btn-box">
        <button className="cancel">CANCEL</button>
        <button className="submit">OK</button>
      </div>
    </CalendarMenuLayout>
  </>
}
const CalendarMenuLayout = styled(Modal)`
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
      color: #4D5586;
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