import { dispatchPicker } from "@shared/modules/IconColorPicker/model/Provider.tsx"
import {
  MenuType,
  setPickerColorType,
  setPickerIconType,
  setPickerMenuTypeType
} from "@shared/modules/IconColorPicker/types.ts"

export const setPickerColor = (payload: string) => {
  const action: setPickerColorType = {
    type: "SET_PICKER_COLOR",
    payload
  }
  dispatchPicker(action)
}
export const setPickerIcon = (payload: string) => {
  const action: setPickerIconType = {
    type: "SET_PICKER_ICON",
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
