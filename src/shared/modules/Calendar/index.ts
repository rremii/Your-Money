import compose from "compose-function"
import { CalendarProvider } from "@shared/modules/Calendar/model/Provider.tsx"
import CalendarComponent from "@shared/modules/Calendar/ui/Calendar.tsx"

export const Calendar = compose(CalendarProvider)(CalendarComponent)
