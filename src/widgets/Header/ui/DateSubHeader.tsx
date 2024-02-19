import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  shiftTransMenuIdsLeft,
  shiftTransMenuIdsRight,
} from "@entities/DateSlider/model/DateSliderSlice.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"

export const DateSubHeader = () => {
  const dispatch = useAppDispatch()

  const dateGap = useTypedSelector((state) => state.Date.curMenu.dateGap)

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
      <div onClick={ShiftDateLeft} className="arrow-left">
        {"<"}
      </div>
      <div className="date" onClick={OpenDateRangeMenu}>
        <img src={Categories} alt="days" />
        <span>{dateGap}</span>
      </div>
      <div onClick={ShiftDateRight} className="arrow-right">
        {">"}
      </div>
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
      color: var(--txt-1);
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
