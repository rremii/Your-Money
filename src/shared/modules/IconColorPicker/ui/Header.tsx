import styled from "styled-components"
import { useContext } from "react"
import { PickerContext } from "@shared/modules/IconColorPicker/model/Context.ts"

export const Header = () => {
  const { curIcon, curColor, IconComponents, title } = useContext(PickerContext)
  return (
    <HeaderLayout $color={curColor}>
      <div className="icon-box">
        {IconComponents?.get(curIcon, { fill: "white" })}
      </div>
      <h2 className="title">{title}</h2>
    </HeaderLayout>
  )
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
    background-color: ${({ $color }) => ($color ? $color : "#0BAD7B")};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.4s;

    svg {
      width: 25px;
      height: 25px;
    }
  }

  h2.title {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.32px;
    margin-bottom: 0;
  }
`
