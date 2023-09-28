import styled from "styled-components"
import { FC } from "react"


interface props {
  title: string
  content: string
  color: string
  icon?: string
  iconRadius: string
  OnClick: () => void
}

export const InfoCell: FC<props> = ({ icon, iconRadius, color, content, title, OnClick }) => {


  return <CellLayout onClick={OnClick} $color={color} $iconRadius={iconRadius}>
    <div className="icon-box">
      <img className="icon" src={icon} alt="icon" />
    </div>
    <h2 className="title">{title}</h2>
    <p className="content">{content}</p>
  </CellLayout>
}
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
  background-color: ${({ $color }) => $color || "var(--bg-3)"};
  flex: 1 1 auto;
  position: relative;

  cursor: pointer;

  .icon-box {
    //display: none;
    width: 43px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: var(--bg-1);
    border-radius: ${({ $iconRadius }) => $iconRadius || "5px"};
    top: 0;
    right: 13px;
    transform: translateY(-50%);

    .icon {
      width: 20px;
      height: 20px;
    }


  }

  .title {
    color: var(--txt-1);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .content {
    color: var(--txt-1);
    font-family: Inter;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`