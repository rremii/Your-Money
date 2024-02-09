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
  setPickerTitlesType,
} from "@shared/modules/IconColorPicker/types.ts"

export const setPickerCurColor = (payload: string) => {
  const action: setPickerCurColorType = {
    type: "SET_PICKER_CUR_COLOR",
    payload
  }
  dispatchPicker(action)
}
export const setPickerColors = (payload: string[]) => {
  const action: setPickerColorsType = {
    type: "SET_PICKER_COLORS",
    payload
  }
  dispatchPicker(action)
}
export const setPickerCurIcon = (payload: string) => {
  const action: setPickerCurIconType = {
    type: "SET_PICKER_CUR_ICON",
    payload
  }
  dispatchPicker(action)
}
export const setPickerIcons = (payload: { firstSection: string[], secondSection: string[] }) => {
  const action: setPickerIconsType = {
    type: "SET_PICKER_ICONS",
    payload
  }
  dispatchPicker(action)
}

export const setPickerMenuType = (payload: MenuType) => {
  const action: setPickerMenuTypeType = {
    type: "SET_MENU_TYPE",
    payload
  }
  dispatchPicker(action)
}

export const setPickerTitles = (payload: { firstSection: string, secondSection: string }) => {
  const action: setPickerTitlesType = {
    type: "SET_PICKER_TITLES",
    payload
  }
  dispatchPicker(action)
}
export const setPickerIconComponents = (payload: IIconComponents) => {
  const action: setPickerIconComponentsType = {
    type: "SET_ICON_COMPONENTS",
    payload
  }
  dispatchPicker(action)
}
