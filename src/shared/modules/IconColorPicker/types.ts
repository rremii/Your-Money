interface Action<T, P> {
  type: T
  payload: P
}

export type MenuType = "icon" | "color"

export type setPickerMenuTypeType = Action<"SET_MENU_TYPE", MenuType>
export type setPickerColorType = Action<"SET_PICKER_COLOR", string>
export type setPickerIconType = Action<"SET_PICKER_ICON", string>

export type Actions = setPickerMenuTypeType | setPickerColorType | setPickerIconType
