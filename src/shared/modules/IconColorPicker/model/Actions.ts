import { dispatchPicker } from "@shared/modules/IconColorPicker/model/Provider.tsx"
import {
  IIconComponents,
  MenuType,
  setPickerColorsType,
  setPickerCurColorType,
  setPickerCurIconType,
  setPickerIconComponentsType,
  setPickerIconsType,
  setPickerMenuTypeType,
  setPickerSectionTitlesType,
  setPickerSubTitlesType,
  setPickerTitleType,
} from "@shared/modules/IconColorPicker/types.ts"

export const setPickerCurColor = (payload: string) => {
  const action: setPickerCurColorType = {
    type: "SET_PICKER_CUR_COLOR",
    payload,
  }
  dispatchPicker(action)
}
export const setPickerColors = (payload: string[]) => {
  const action: setPickerColorsType = {
    type: "SET_PICKER_COLORS",
    payload,
  }
  dispatchPicker(action)
}
export const setPickerCurIcon = (payload: string) => {
  const action: setPickerCurIconType = {
    type: "SET_PICKER_CUR_ICON",
    payload,
  }
  dispatchPicker(action)
}
export const setPickerIcons = (payload: {
  firstSection: string[]
  secondSection: string[]
}) => {
  const action: setPickerIconsType = {
    type: "SET_PICKER_ICONS",
    payload,
  }
  dispatchPicker(action)
}

export const setPickerMenuType = (payload: MenuType) => {
  const action: setPickerMenuTypeType = {
    type: "SET_MENU_TYPE",
    payload,
  }
  dispatchPicker(action)
}

export const setPickerSectionTitles = (payload: {
  firstSection: string
  secondSection: string
}) => {
  const action: setPickerSectionTitlesType = {
    type: "SET_PICKER_SECTION_TITLES",
    payload,
  }
  dispatchPicker(action)
}
export const setPickerTitle = (payload: string) => {
  const action: setPickerTitleType = {
    type: "SET_PICKER_TITLE",
    payload,
  }
  dispatchPicker(action)
}
export const setPickerSubTitles = (payload: [string, string]) => {
  const action: setPickerSubTitlesType = {
    type: "SET_PICKER_SUB_TITLES",
    payload,
  }
  dispatchPicker(action)
}
export const setPickerIconComponents = (payload: IIconComponents) => {
  const action: setPickerIconComponentsType = {
    type: "SET_ICON_COMPONENTS",
    payload,
  }
  dispatchPicker(action)
}
