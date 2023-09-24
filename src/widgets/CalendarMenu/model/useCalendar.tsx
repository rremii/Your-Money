import { useState } from "react"

export const useCalendar = () => {

  const [date, setDate] = useState<string>()

  return { date, setDate }

}