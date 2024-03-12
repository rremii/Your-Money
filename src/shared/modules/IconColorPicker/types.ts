import { ReactNode } from "react"

interface Action<T, P> {
  type: T
  payload: P
}

export type MenuType = "icon" | "color"

export type setPickerMenuTypeType = Action<"SET_MENU_TYPE", MenuType>
export type setPickerCurColorType = Action<"SET_PICKER_CUR_COLOR", string>
export type setPickerCurIconType = Action<"SET_PICKER_CUR_ICON", string>
export type setPickerIconsType = Action<
  "SET_PICKER_ICONS",
  {
    firstSection: string[]
    secondSection: string[]
  }
>
export type setPickerSectionTitlesType = Action<
  "SET_PICKER_SECTION_TITLES",
  {
    firstSection: string
    secondSection: string
  }
>
export type setPickerTitleType = Action<"SET_PICKER_TITLE", string>
export type setPickerSubTitlesType = Action<
  "SET_PICKER_SUB_TITLES",
  [string, string]
>
export type setPickerIconComponentsType = Action<
  "SET_ICON_COMPONENTS",
  IIconComponents
>
export type setPickerColorsType = Action<"SET_PICKER_COLORS", string[]>

export type Actions =
  | setPickerMenuTypeType
  | setPickerCurColorType
  | setPickerCurIconType
  | setPickerIconsType
  | setPickerColorsType
  | setPickerSectionTitlesType
  | setPickerTitleType
  | setPickerIconComponentsType
  | setPickerSubTitlesType

interface GetComponentsProps {
  fill: string
}

export interface IIconComponents {
  // func that will return icon component by its name
  get(name: string, svgParams?: GetComponentsProps): ReactNode
}
