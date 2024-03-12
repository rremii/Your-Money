import React, { Component, FC, useReducer } from "react"
import { Actions } from "@shared/modules/IconColorPicker/types.ts"
import {
  initialState,
  PickerContext,
  PickerCtxReducer,
} from "@shared/modules/IconColorPicker/model/Context.ts"

export let dispatchPicker: React.Dispatch<Actions>

export function IconColorPickerProvider<T>(Component: FC<any>): FC<T> {
  return (props): React.ReactNode => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [calendarState, dispatch] = useReducer(PickerCtxReducer, initialState)

    dispatchPicker = dispatch

    return (
      <PickerContext.Provider value={calendarState}>
        <Component {...props} />
      </PickerContext.Provider>
    )
  }
}
