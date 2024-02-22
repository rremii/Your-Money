import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useEffect } from "react"
import { setAllTransDateGap } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"

export const useAllTransDateGap = () => {
  const dispatch = useAppDispatch()

  const dateFilter = useTypedSelector((state) => state.Date.dateFilter)
  const initDate = useTypedSelector((state) => state.Date.initDate)
  const dateMenuIds = useTypedSelector((state) => state.Date.dateMenuIds)
  const firstDay = useTypedSelector((state) => state.Settings.firstDay)

  useEffect(() => {
    switch (dateFilter) {
      case "allTime": {
        dispatch(setAllTransDateGap({ dateTo: "", dateFrom: "" }))
        break
      }
      case "year": {
        const firstMenuId = dateMenuIds[0]
        const lastMenuId = dateMenuIds[dateMenuIds.length - 1]

        const { dateFrom } = timeGap.GetYearGap(firstMenuId, initDate)
        const { dateTo } = timeGap.GetYearGap(lastMenuId, initDate)

        dispatch(
          setAllTransDateGap({
            dateFrom: dateFrom.toUTCString(),
            dateTo: dateTo.toUTCString(),
          }),
        )
        break
      }
      case "month": {
        const firstMenuId = dateMenuIds[0]
        const lastMenuId = dateMenuIds[dateMenuIds.length - 1]

        const { dateFrom } = timeGap.GetMonthGap(firstMenuId, initDate)
        const { dateTo } = timeGap.GetMonthGap(lastMenuId, initDate)

        dispatch(
          setAllTransDateGap({
            dateFrom: dateFrom.toUTCString(),
            dateTo: dateTo.toUTCString(),
          }),
        )
        break
      }
      case "week": {
        const firstMenuId = dateMenuIds[0]
        const lastMenuId = dateMenuIds[dateMenuIds.length - 1]

        const { dateFrom } = timeGap.GetWeekGap(firstDay, firstMenuId, initDate)
        const { dateTo } = timeGap.GetWeekGap(firstDay, lastMenuId, initDate)

        dispatch(
          setAllTransDateGap({
            dateFrom: dateFrom.toUTCString(),
            dateTo: dateTo.toUTCString(),
          }),
        )
        break
      }
      case "day": {
        const firstMenuId = dateMenuIds[0]
        const lastMenuId = dateMenuIds[dateMenuIds.length - 1]

        const { dateFrom } = timeGap.GetDayGap(firstMenuId, initDate)
        const { dateTo } = timeGap.GetDayGap(lastMenuId, initDate)

        const startMonth = timeGap.GetMonthGap(0, dateFrom)
        const endMonth = timeGap.GetMonthGap(0, dateTo)
        dispatch(
          setAllTransDateGap({
            dateFrom: startMonth.dateFrom.toISOString(),
            dateTo: endMonth.dateTo.toISOString(),
          }),
        )

        break
      }
    }
  }, [dateFilter, dateMenuIds, firstDay])
}
