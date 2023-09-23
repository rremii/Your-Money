interface Action<T, P> {
  type: T
  payload: P
}

export type setCurCalendarDateType = Action<"SET_CUR_DATE", string>
export type updateMenuDatesType = Action<"UPDATE_MENU_DATES", { initialDate: string }>

export type Actions = setCurCalendarDateType | updateMenuDatesType
