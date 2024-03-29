import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { OptionBtn } from "@features/ChangeDateRangeModal/ui/OptionBtn.tsx"
import Categories from "/public/icons/general/categories.svg"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu, openMenu } from "@entities/UI/model/ModalsSlice.ts"
import {
  setAllTimeFilter,
  setCurDate,
  setMonthFilter,
  setWeekFilter,
  setYearFilter
} from "@entities/DateSlider/model/DateSliderSlice.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { memo } from "react"
import { DateFilter } from "@entities/Transaction/types.ts"
import { useTranslation } from "react-i18next"
import { TranslateDateGap } from "@entities/DateSlider"
import YearIcon from "@icons/general/year.svg?react"
import WeekIcon from "@icons/general/week.svg?react"
import AllTimeIcon from "@icons/general/infinity.svg?react"
import MonthIcon from "@icons/general/month.svg?react"
import DayIcon from "@icons/general/day.svg?react"


export const ChangeDateRangeModal = memo(() => {
  const dispatch = useAppDispatch()

  const initDate = useTypedSelector((state) => state.Date.curMenu.dateFrom)
  const dateFilter = useTypedSelector((state) => state.Date.dateFilter)
  const firstDay = useTypedSelector((state) => state.Settings.firstDay)
  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.dateRangeMenu.isOpen
  )

  const { t } = useTranslation()

  const { dateGap: todaySubTitle } = timeGap.GetDayGap(0, new Date(Date.now()))
  const transTodaySubTitle = TranslateDateGap(t, todaySubTitle, "day")
  const { dateGap: selectedDaySubTitle } = timeGap.GetDayGap(0, initDate)
  const tranSelectDaySubTitle = TranslateDateGap(t, selectedDaySubTitle, "day")
  const { dateGap: weekSubTitle } = timeGap.GetWeekGap(firstDay, 0, initDate)
  const transWeekSubTitle = TranslateDateGap(t, weekSubTitle, "week")
  const { dateGap: monthSubTitle } = timeGap.GetMonthGap(0, initDate)
  const transMonthSubTitle = TranslateDateGap(t, monthSubTitle, "month")
  const { dateGap: yearSubTitle } = timeGap.GetYearGap(0, initDate)
  const transYearSubTitle = TranslateDateGap(t, yearSubTitle, "year")

  const SetDateFilter = (filter: DateFilter) => {
    window.localStorage.setItem("dateFilter", filter)
  }
  const CloseMenu = () => {
    dispatch(closeMenu("dateRangeMenu"))
  }
  const OpenSelectDayMenu = () => {
    dispatch(openMenu("calendarMenu"))
    dispatch(closeMenu("dateRangeMenu"))
    SetDateFilter("day")
    CloseMenu()
  }

  const SetAllTimeRange = () => {
    dispatch(setAllTimeFilter())
    SetDateFilter("allTime")
    CloseMenu()
  }
  const SetWeekRange = () => {
    dispatch(setWeekFilter({ initDate, firstDay }))
    SetDateFilter("week")
    CloseMenu()
  }
  const SetTodayRange = () => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toUTCString()
    const slider = document.querySelector("#slider")
    if (!slider) return

    const sliderWidth = slider.clientWidth * 11

    SetDateFilter("day")
    dispatch(setCurDate(date))
    window.localStorage.setItem("scroll", String(sliderWidth / 2 - 200))
    CloseMenu()
  }
  const SetMonthRange = () => {
    dispatch(setMonthFilter(initDate))
    SetDateFilter("month")
    CloseMenu()
  }
  const SetYearRange = () => {
    dispatch(setYearFilter(initDate))
    SetDateFilter("year")
    CloseMenu()
  }

  return (
    <>
      <Overlay onClick={CloseMenu} $zIndex={50} $isActive={isOpen} />
      <DateModalLayout $isOpen={isOpen}>
        <OptionBtn
          OnClick={SetAllTimeRange}
          title={t("dateRange.allTime")}
          icon={<AllTimeIcon />}
          isActive={dateFilter === "allTime"}
        />
        <OptionBtn
          OnClick={OpenSelectDayMenu}
          title={t("dateRange.selectDay")}
          subTitle={tranSelectDaySubTitle}
          icon={<DayIcon />}
        />
        <OptionBtn
          OnClick={SetWeekRange}
          title={t("general.time.week")}
          subTitle={transWeekSubTitle}
          icon={<WeekIcon />}
          isActive={dateFilter === "week"}

        />
        <OptionBtn
          OnClick={SetTodayRange}
          title={t("general.time.today")}
          subTitle={transTodaySubTitle}
          isActive={dateFilter === "day"}
          icon={<DayIcon />}

        />
        <OptionBtn
          OnClick={SetYearRange}
          title={t("general.time.year")}
          subTitle={transYearSubTitle}
          isActive={dateFilter === "year"}
          icon={<YearIcon />}
        />
        <OptionBtn
          OnClick={SetMonthRange}
          title={t("general.time.month")}
          subTitle={transMonthSubTitle}
          isActive={dateFilter === "month"}
          icon={<MonthIcon />}
        />
      </DateModalLayout>
    </>
  )
})
const DateModalLayout = styled(Modal)`
    z-index: 55;
    max-width: 310px;
    padding: 0;
    background-color: var(--sub-bg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 95px;
`
