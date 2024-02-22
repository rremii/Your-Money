import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { OptionBtn } from "@features/ChangeDateRangeModal/ui/OptionBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu, openMenu } from "@entities/UI/model/ModalsSlice.ts"
import {
  setAllTimeFilter,
  setCurDate,
  setMonthFilter,
  setWeekFilter,
  setYearFilter,
} from "@entities/DateSlider/model/DateSliderSlice.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { memo } from "react"
import { DateFilter } from "@entities/Transaction/types.ts"

export const ChangeDateRangeModal = memo(() => {
  const dispatch = useAppDispatch()

  const initDate = useTypedSelector((state) => state.Date.curMenu.dateFrom)
  const firstDay = useTypedSelector((state) => state.Settings.firstDay)
  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.dateRangeMenu.isOpen,
  )

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
      new Date().getDate(),
    ).toUTCString()
    const slider = document.querySelector("#slider")
    if (!slider) return

    const sliderWidth = slider.clientWidth * 11

    window.localStorage.setItem("scroll", String(sliderWidth / 2 - 200))
    dispatch(setCurDate(date))
    SetDateFilter("day")
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

  const { dateGap: todaySubTitle } = timeGap.GetDayGap(0, new Date(Date.now()))
  const { dateGap: selectedDaySubTitle } = timeGap.GetDayGap(0, initDate)
  const { dateGap: weekSubTitle } = timeGap.GetWeekGap(firstDay, 0, initDate)
  const { dateGap: monthSubTitle } = timeGap.GetMonthGap(0, initDate)
  const { dateGap: yearSubTitle } = timeGap.GetYearGap(0, initDate)
  return (
    <>
      <Overlay onClick={CloseMenu} $zIndex={50} $isActive={isOpen} />
      <DateModalLayout $isOpen={isOpen}>
        <OptionBtn
          OnClick={SetAllTimeRange}
          title={"All time"}
          icon={<img src={Categories} alt="all time" />}
        />
        <OptionBtn
          OnClick={OpenSelectDayMenu}
          title={"Select day"}
          subTitle={selectedDaySubTitle}
          icon={<img src={Categories} alt="Select day" />}
        />
        <OptionBtn
          OnClick={SetWeekRange}
          title={"Week"}
          subTitle={weekSubTitle}
          icon={<img src={Categories} alt="Week" />}
        />
        <OptionBtn
          OnClick={SetTodayRange}
          title={"Today"}
          subTitle={todaySubTitle}
          icon={<img src={Categories} alt="Today" />}
        />
        <OptionBtn
          OnClick={SetYearRange}
          title={"Year"}
          subTitle={yearSubTitle}
          icon={<img src={Categories} alt="Year" />}
        />
        <OptionBtn
          OnClick={SetMonthRange}
          title={"Month"}
          subTitle={monthSubTitle}
          icon={<img src={Categories} alt="Month" />}
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
  grid-auto-rows: 85px;
`
