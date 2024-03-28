import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  shiftTransMenuIdsLeft,
  shiftTransMenuIdsRight
} from "@entities/DateSlider/model/DateSliderSlice.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"
import { TranslateDateGap } from "@entities/DateSlider"
import ArrowRight from "@icons/general/arrow-right.svg?react"
import ArrowLeft from "@icons/general/arrow-left.svg?react"
import { GetIconByDateFilter } from "@entities/DateSlider/model/GetIconByDateFilter.ts"
import ExpendIcon from "@icons/general/expend.svg?react"

export const DateSubHeader = () => {
  const dispatch = useAppDispatch()

  const dateGap = useTypedSelector((state) => state.Date.curMenu.dateGap)
  const dateFilter = useTypedSelector((state) => state.Date.dateFilter)

  const { t } = useTranslation()
  const translatedDateGap = TranslateDateGap(t, dateGap, dateFilter)

  const ShiftDateRight = () => {
    dispatch(shiftTransMenuIdsRight({ shiftAmount: 1 }))
  }

  const ShiftDateLeft = () => {
    dispatch(shiftTransMenuIdsLeft({ shiftAmount: 1 }))
  }

  const OpenDateRangeMenu = () => {
    dispatch(openMenu("dateRangeMenu"))
  }

  const FilterIcon = GetIconByDateFilter(dateFilter)

  return (
    <SubHeaderLayout>
      <button onClick={ShiftDateLeft} className="arrow-left">
        <ArrowLeft className="arrow" />
      </button>
      <button className="date" onClick={OpenDateRangeMenu}>
        <FilterIcon className="filter-icon" />
        <span>{translatedDateGap}</span>
        <ExpendIcon className="expend" />
      </button>
      <button onClick={ShiftDateRight} className="arrow-right">
        <ArrowRight className="arrow" />
      </button>
    </SubHeaderLayout>
  )
}
const SubHeaderLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 34px 10px;


    .arrow {
        width: 10px;
        height: 10px;
        fill: white;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .date {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;

        .filter-icon {
            fill: white;
            width: 30px !important;
        }

        .expend {
            width: 10px !important;
            height: 10px !important;
            fill: white;
        }

        span {
            color: #ffffff;
            font-family: Inter, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
`
