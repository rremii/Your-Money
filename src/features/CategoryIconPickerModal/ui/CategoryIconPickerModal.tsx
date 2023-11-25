import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, { memo, useCallback, useState } from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Calendar } from "@shared/modules/Calendar"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { IconColorPicker } from "@shared/modules/IconColorPicker"

export const CategoryIconPickerModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.UI.Modals.iconColorPickerMenu.isOpen)
  // const isOpen = useTypedSelector(state => state.UI.Modals.iconColorPickerMenu.isOpen)


  // const [chosenDate, setChosenDate] = useState<string>(initialDate)


  const CloseIconColorPicker = () => {
    dispatch(closeMenu("iconColorPickerMenu"))
  }

  // const OnChosenDateChange = useCallback((dateStr: string) => {
  //   setChosenDate(dateStr)
  // }, [])

  const OnSubmit = () => {
    // dispatch(closeMenu("iconColorPickerMenu"))
  }

  return <>
    <Overlay onClick={CloseIconColorPicker}
             $isActive={isOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <IconPickerModalLayout $color={"green"} $isOpen={isOpen}>
      <IconColorPicker />
      <div className="btn-box">
        <button onClick={CloseIconColorPicker} className="cancel">CANCEL</button>
        <button onClick={OnSubmit} className="submit">DONE</button>
      </div>
    </IconPickerModalLayout>
  </>
})
const IconPickerModalLayout = styled(Modal)<{
  $color?: string
}>`
  z-index: 50;
  padding: 0;
  max-width: 400px;

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