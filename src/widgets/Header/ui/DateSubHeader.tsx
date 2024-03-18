import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  shiftTransMenuIdsLeft,
  shiftTransMenuIdsRight,
} from "@entities/DateSlider/model/DateSliderSlice.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"
import { TranslateDateGap } from "@entities/DateSlider"

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

  return (
    <SubHeaderLayout>
      <button onClick={ShiftDateLeft} className="arrow-left">
        {"<"}
      </button>
      <button className="date" onClick={OpenDateRangeMenu}>
        <img src={Categories} alt="days" />
        <span>{translatedDateGap}</span>
      </button>
      <button onClick={ShiftDateRight} className="arrow-right">
        {">"}
      </button>
    </SubHeaderLayout>
  )
}
const SubHeaderLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 34px 10px;

  .arrow-left,
  .arrow-right {
    width: 10px;
    height: 10px;
    color: white;
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

    img {
      width: 20px;
      height: 20px;
    }

    span {
      color: #ffffff;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
