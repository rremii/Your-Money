import styled from "styled-components"
import { memo, useContext } from "react"
import { PickerContext } from "@shared/modules/IconColorPicker/model/Context.ts"

export const SubHeader = () => {

  const { menuType } = useContext(PickerContext)

  const scrollPercent = menuType === "icon" ? 0 : 100
  return <SubHeaderLayout $scrollPercent={scrollPercent}>
    <div className="cell">
      <p className={`type ${menuType === "icon" ? "active" : ""}`}>ICON</p>
    </div>
    <div className="cell">
      <p className={`type ${menuType === "color" ? "active" : ""}`}>COLOR</p>
    </div>
    <div className="slider">
      <div className="pushing-bar" />
      <div className="bar" />
    </div>
  </SubHeaderLayout>
}
const SubHeaderLayout = styled.header<{
  $scrollPercent?: number
}>`
  display: flex;
  height: 40px;
  position: relative;
  box-shadow: 0 5px 5px -5px var(--shadow-3);
  z-index: 1;

  .slider {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;

    .pushing-bar {
      transition: 0.7s width;

      width: ${({ $scrollPercent }) => ($scrollPercent || 0) / 2}%;
    }

    .bar {

      flex: 0 0 50%;
      background-color: #808080;
      height: 3px;
      border-radius: 10px 10px 0px 0px;
    }
  }

  .cell {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .type {
      transition: color .3s;
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: #C9C9C9;
    }

    .active {
      color: #808080;
    }
  }
`