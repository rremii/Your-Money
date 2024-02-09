import { CalendarProvider } from "@shared/modules/Calendar/model/Provider.tsx"
import CalendarComponent from "@shared/modules/Calendar/ui/Calendar.tsx"

export const Calendar = CalendarProvider<{
  initialDate: string
  OnChange: (chosenDateStr: string) => void
  color: string
}>(CalendarComponent)
