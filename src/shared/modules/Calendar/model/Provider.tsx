import React, { FC, useReducer } from "react"
import { CalendarContext, CalendarCtxReducer, initialState } from "@shared/modules/Calendar/model/Context.ts"
import { Actions } from "@shared/modules/Calendar/types.ts"


export let dispatchCalendar: React.Dispatch<Actions>

export const CalendarProvider = (Component: FC) => {

  const [calendarState, dispatch] = useReducer(CalendarCtxReducer, initialState)

  dispatchCalendar = dispatch

  return <CalendarContext.Provider value={calendarState}>
    <Component />
  </CalendarContext.Provider>
}