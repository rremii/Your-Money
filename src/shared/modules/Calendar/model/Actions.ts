import { dispatchCalendar } from "@shared/modules/Calendar/model/Provider.tsx"
import {
  setCalendarColorType,
  setCurCalendarDateType,
  updateMenuDatesType,
  CalendarType, setCalendarTypeType
} from "@shared/modules/Calendar/types.ts"


export const setCurCalendarDate = (payload: string) => {
  const action: setCurCalendarDateType = {
    type: "SET_CUR_DATE",
    payload
  }
  dispatchCalendar(action)
}
export const updateMenuDates = (payload: { initialDate: string; }) => {
  const action: updateMenuDatesType = {
    type: "UPDATE_MENU_DATES",
    payload
  }
  dispatchCalendar(action)
}
export const setCalendarColor = (payload: string) => {
  const action: setCalendarColorType = {
    type: "SET_CALENDAR_COLOR",
    payload
  }
  dispatchCalendar(action)
}

export const setCalendarType = (payload: CalendarType) => {
  const action: setCalendarTypeType = {
    type: "SET_CALENDAR_TYPE",
    payload
  }
  dispatchCalendar(action)
}


