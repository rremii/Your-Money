import React, { FC } from "react"
import { Actions } from "@shared/modules/Calendar/types.ts"

interface initialState {
  menusDatesStr: string[]
  chosenDateStr: string
}

export const initialState = {
  menusDatesStr: [],
  chosenDateStr: ""
} as initialState

export const CalendarContext = React.createContext(initialState)
export const CalendarCtxReducer = (state: initialState, action: Actions): initialState => {

  switch (action.type) {
    case "UPDATE_MENU_DATES": {

      const initDate = new Date(action.payload.initialDate)

      const menusDatesStr: string[] = []

      for (let index = -5; index < 6; index++) {
        const date = new Date(initDate.getFullYear(), initDate.getMonth() + index, 1).toUTCString()
        menusDatesStr.push(date)
      }

      return {
        ...state,
        menusDatesStr
      }
    }
    case "SET_CUR_DATE": {
      return {
        ...state,
        chosenDateStr: action.payload
      }
    }
    default: {
      return state
    }
  }

}


