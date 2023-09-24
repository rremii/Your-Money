interface Action<T, P> {
  type: T
  payload: P
}

export type CalendarType = "month" | "year"

export type setCurCalendarDateType = Action<"SET_CUR_DATE", string>
export type updateMenuDatesType = Action<"UPDATE_MENU_DATES", { initialDate: string }>
export type setCalendarColorType = Action<"SET_CALENDAR_COLOR", string>
export type setCalendarTypeType = Action<"SET_CALENDAR_TYPE", CalendarType>

export type Actions = setCurCalendarDateType | updateMenuDatesType | setCalendarColorType | setCalendarTypeType
