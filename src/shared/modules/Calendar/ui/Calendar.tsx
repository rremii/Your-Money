import styled from "styled-components"
import React, { FC, useContext } from "react"
import { Header } from "@shared/modules/Calendar/ui/Header.tsx"
import { MonthSlider } from "@shared/modules/Calendar/ui/MonthSlider.tsx"
import { CalendarProvider } from "@shared/modules/Calendar/model/Provider.tsx"
import compose from "compose-function"
import { withRouter } from "../../../../app/providers/with-router.tsx"
import { withStore } from "../../../../app/providers/with-store.tsx"
import { withRedirect } from "../../../../app/providers/with-redirect.tsx"
import { withAuth } from "../../../../app/providers/with-auth.tsx"
import { CalendarContext } from "@shared/modules/Calendar/model/Context.ts"


interface props {
  initialDate: string
}


const Calendar: FC<props> = ({ initialDate }) => {

  // const {} = useContext(CalendarContext)

  return <CalendarLayout>
    <Header />
    <MonthSlider initialDate={initialDate} />
  </CalendarLayout>
}
export default Calendar
const CalendarLayout = styled.div`

`
