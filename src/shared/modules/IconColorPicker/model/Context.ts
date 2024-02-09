import React from "react"
import {
  Actions,
  IIconComponents,
  MenuType,
} from "@shared/modules/IconColorPicker/types.ts"

interface initialState {
  menuType: MenuType
  sectionTitles: {
    firstSection: string
    secondSection: string
  }
  IconComponents: IIconComponents | null

  curColor: string
  curIcon: string
  colors: string[]
  icons: {
    firstSection: string[]
    secondSection: string[]
  }
}

export const initialState = {
  curIcon: "",
  curColor: "",
  colors: [],
  icons: {
    firstSection: [],
    secondSection: []
  },

  sectionTitles: {
    firstSection: "",
    secondSection: ""
  },
  IconComponents: null,
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
    case "SET_PICKER_CUR_COLOR": {
      return {
        ...state,
        curColor: action.payload
      }
    }
    case "SET_PICKER_CUR_ICON": {
      return {
        ...state,
        curIcon: action.payload
      }
    }
    case "SET_PICKER_ICONS": {
      return {
        ...state,
        icons: action.payload
      }
    }
    case "SET_PICKER_COLORS": {
      return {
        ...state,
        colors: action.payload
      }
    }
    case "SET_PICKER_TITLES": {
      return {
        ...state,
        sectionTitles: action.payload
      }
    }
    case "SET_ICON_COMPONENTS": {
      return {
        ...state,
        IconComponents: action.payload
      }
    }

    default: {
      return state
    }
  }

}


