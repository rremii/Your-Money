import { dispatchCalendar } from "@shared/modules/Calendar/model/Provider.tsx"
import { setCurCalendarDateType, updateMenuDatesType } from "@shared/modules/Calendar/types.ts"


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
