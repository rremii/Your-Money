import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { IconColorPicker } from "@shared/modules/IconColorPicker"
import AccountCategoryIconComp from "@shared/assets/AccountCategoryIconComp.tsx"
import { pickerIcons } from "@shared/modules/IconColorPicker/constants/PickerIcons.ts"
import { pickerColors } from "@shared/modules/IconColorPicker/constants/PickerColors.ts"
import { GetRandomColor } from "@shared/modules/IconColorPicker/utils/GetRandomColor.ts"
import { GetRandomCategoryIcon } from "@shared/modules/IconColorPicker/utils/GetRandomCategoryIcon.ts"

interface props {
  isOpen: boolean
  icon: string
  color: string
  OnClose: () => void
  OnSubmit: ({ icon, color }: { icon: string; color: string }) => void
}

export const IconColorPickerModal: FC<props> = memo(
  ({ icon, color, isOpen, OnClose, OnSubmit }) => {
    const [chosenIconInfo, setIconInfo] = useState<{
      color: string
      icon: string
    }>({
      color: GetRandomColor(),
      icon: GetRandomCategoryIcon(),
    })

    useEffect(() => {
      setIconInfo({ color, icon })
    }, [icon, color])

    const OnIconColorChange = useCallback(
      (values: { color: string; icon: string }) => {
        setIconInfo(values)
      },
      [],
    )

    const HandleSubmit = () => {
      OnSubmit({ color: chosenIconInfo.color, icon: chosenIconInfo.icon })
    }

    const pickerSectionTitles = useMemo(
      () => ({ firstSection: "Accounts", secondSection: "Categories" }),
      [],
    )
    const initPickerIcons = useMemo(
      () => ({
        firstSection: pickerIcons.accountIcons,
        secondSection: pickerIcons.categoryIcons,
      }),
      [],
    )
    const initInfo = useMemo(
      () => ({
        icon: chosenIconInfo.icon,
        color: chosenIconInfo.color,
      }),
      [chosenIconInfo.icon, chosenIconInfo.color],
    )

    return (
      <>
        <Overlay
          onClick={OnClose}
          $isActive={isOpen}
          $zIndex={50}
          $color={"rgba(0, 0, 0, 0.5 )"}
        />
        <IconPickerModalLayout $isOpen={isOpen}>
          <IconColorPicker
            OnChange={OnIconColorChange}
            IconComponents={AccountCategoryIconComp}
            sectionTitles={pickerSectionTitles}
            icons={initPickerIcons}
            colors={pickerColors}
            initInfo={initInfo}
          />
          <div className="btn-box">
            <button onClick={OnClose} className="cancel">
              CANCEL
            </button>
            <button onClick={HandleSubmit} className="submit">
              DONE
            </button>
          </div>
        </IconPickerModalLayout>
      </>
    )
  },
)
const IconPickerModalLayout = styled(Modal)`
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

    .cancel,
    .submit {
      color: var(--main-txt);
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
