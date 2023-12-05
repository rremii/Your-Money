import styled from "styled-components"
import { memo, useContext } from "react"
import { PickerContext } from "@shared/modules/IconColorPicker/model/Context.ts"


export const Header = () => {

  const { curIcon, curColor, IconComponents } = useContext(PickerContext)

  return <HeaderLayout $color={curColor}>
    <div className="icon-box">
      {IconComponents?.get(curIcon, { fill: "white" })}
    </div>
    <h1 className="title">Category icon</h1>
  </HeaderLayout>
}
const HeaderLayout = styled.header<{
  $color?: string
}>`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 65px;
  padding: 0 22px;

  .icon-box {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color ? $color : "#0BAD7B"};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .4s;

    svg {
      width: 25px;
      height: 25px;
    }
  }

  h1.title {
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.32px;
    margin-bottom: 0;
  }


`