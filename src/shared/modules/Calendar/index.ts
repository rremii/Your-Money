import compose from "compose-function"
import { CalendarProvider } from "@shared/modules/Calendar/model/Provider.tsx"
import CalendarComponent from "@shared/modules/Calendar/ui/Calendar.tsx"
import { withRouter } from "../../../app/providers/with-router.tsx"
import { withStore } from "../../../app/providers/with-store.tsx"
import { withRedirect } from "../../../app/providers/with-redirect.tsx"
import { withAuth } from "../../../app/providers/with-auth.tsx"
import React from "react"


export const Calendar = CalendarProvider<{
  initialDate: string
  OnChange: (chosenDateStr: string) => void
}>(CalendarComponent)
