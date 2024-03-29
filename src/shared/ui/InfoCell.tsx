import styled from "styled-components"
import { FC, memo, ReactNode } from "react"

interface props {
  title: string
  content: string
  color: string
  iconNode: ReactNode
  iconRadius: string
  OnClick: () => void
}

export const InfoCell: FC<props> = memo(
  ({ iconNode, iconRadius, color, content, title, OnClick }) => {
    return (
      <CellLayout onClick={OnClick} $color={color} $iconRadius={iconRadius}>
        <div className="icon-box">{iconNode}</div>
        <h2 className="title">{title}</h2>
        <p className="content">{content}</p>
      </CellLayout>
    )
  },
)
const CellLayout = styled.div<{
  $color?: string
  $iconRadius?: string
}>`
  height: 71px;
  display: flex;
  justify-content: center;
  gap: 4px;
  flex-direction: column;
  padding: 0 16px;
  background-color: ${({ $color }) => $color || "#5C6AC0"};
  //flex: 1 1 auto;
  width: 100%;
  position: relative;

  cursor: pointer;

  .icon-box {
    width: 43px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: white;
    border-radius: ${({ $iconRadius }) => $iconRadius || "5px"};
    top: 0;
    right: 13px;
    transform: translateY(-50%);
  }

  .title {
    color: #ffffff;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .content {
    color: #ffffff;
    font-family: Inter;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
