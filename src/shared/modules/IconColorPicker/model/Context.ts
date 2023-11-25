import React from "react"
import { Actions, MenuType } from "@shared/modules/IconColorPicker/types.ts"

interface initialState {
  menuType: MenuType
  color: string
  icon: string
}

export const initialState = {
  icon: "",
  color: "",
  menuType: "icon"
} as initialState

export const PickerContext = React.createContext(initialState)
export const PickerCtxReducer = (state: initialState, action: Actions): initialState => {

  switch (action.type) {
    case "SET_MENU_TYPE": {
      return {
        ...state,
        menuType: action.payload
      }
    }
    case "SET_PICKER_COLOR": {
      return {
        ...state,
        color: action.payload
      }
    }
    case "SET_PICKER_ICON": {
      return {
        ...state,
        icon: action.payload
      }
    }

    default: {
      return state
    }
  }

}


