import React, { Component, FC, useReducer, useState } from "react"
import { CalendarContext, CalendarCtxReducer, initialState } from "@shared/modules/Calendar/model/Context.ts"
import { Actions } from "@shared/modules/Calendar/types.ts"


export let dispatchCalendar: React.Dispatch<Actions>


interface props {
  children: React.ReactNode
}

// export type HOC<T> = (Component: FC<T>) => (props: T) => React.ReactNode

export function CalendarProvider<T>(Component: FC<any>): FC<T> {


  return (props): React.ReactNode => {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [calendarState, dispatch] = useReducer(CalendarCtxReducer, initialState)


    dispatchCalendar = dispatch

    return <CalendarContext.Provider value={calendarState}>
      <Component {...props} />
    </CalendarContext.Provider>
  }

}

// export const CalendarProvider: FC<props> = ({ children }) => {
//
//   const [calendarState, dispatch] = useReducer(CalendarCtxReducer, initialState)
//
//   dispatchCalendar = dispatch
//
//   return <CalendarContext.Provider value={calendarState}>
//     {children}
//   </CalendarContext.Provider>
// }