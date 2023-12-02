import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, { memo, useCallback, useMemo, useState } from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { IconColorPicker } from "@shared/modules/IconColorPicker"
import AccountCategoryIconComp from "@shared/ui/AccountCategoryIconComp.tsx"
import { GetRandomColor } from "@features/CategoryIconPickerModal/utils/GetRandomColor.ts"
import { GetRandomCategoryIcon } from "@features/CategoryIconPickerModal/utils/GetRandomCategoryIcon.ts"
import { pickerColors } from "@features/CategoryIconPickerModal/constants/PickerColors.ts"
import { pickerIcons } from "@features/CategoryIconPickerModal/constants/PickerIcons.ts"
import { setNewCategoryColor, setNewCategoryIcon } from "@entities/Category/model/NewCategorySlice.ts"

export const CategoryIconPickerModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.UI.Modals.categoryIconPickerMenu.isOpen)


  const [chosenIconInfo, setIconInfo] = useState<{ color: string, icon: string }>({
    color: GetRandomColor(),
    icon: GetRandomCategoryIcon()
  })


  const CloseIconColorPicker = () => {
    dispatch(closeMenu("categoryIconPickerMenu"))
  }

  const OnIconColorChange = useCallback((values: { color: string, icon: string }) => {
    setIconInfo(values)
  }, [])

  const OnSubmit = () => {
    dispatch(setNewCategoryColor(chosenIconInfo.color))
    dispatch(setNewCategoryIcon(chosenIconInfo.icon))
    dispatch(closeMenu("categoryIconPickerMenu"))
  }


  const pickerSectionTitles = useMemo(() => ({ firstSection: "Accounts", secondSection: "Categories" }), [])
  const initPickerIcons = useMemo(() => ({
    firstSection: pickerIcons.accountIcons,
    secondSection: pickerIcons.categoryIcons
  }), [])
  const initInfo = useMemo(() => ({
    icon: chosenIconInfo.icon,
    color: chosenIconInfo.color
  }), [chosenIconInfo.icon, chosenIconInfo.color])


  return <>
    <Overlay onClick={CloseIconColorPicker}
             $isActive={isOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <IconPickerModalLayout $color={"green"} $isOpen={isOpen}>
      <IconColorPicker
        OnChange={OnIconColorChange}
        IconComponents={AccountCategoryIconComp}
        sectionTitles={pickerSectionTitles}
        icons={initPickerIcons}
        colors={pickerColors}
        initInfo={initInfo}
      />
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