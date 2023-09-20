import styled from "styled-components"
import { FC } from "react"

interface props {
  img: string
  title: string
  subTitle?: string
  isActive?: boolean
  color?: string
}

export const PickDateBtn: FC<props> = ({ title, subTitle, img, isActive, color }) => {

  return <PickDateBtnLayout $isActive={isActive} $color={color} className="PickDateBtn">
    <img src={img} alt="icon" />
    <h2 className="title">{title}</h2>
    <p className="sub-title">{subTitle}</p>
  </PickDateBtnLayout>
}
const PickDateBtnLayout = styled.button<{
  $isActive?: boolean
  $color?: string
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //gap: 5px;
  padding: 10px;
  border: ${({ $isActive }) => $isActive && "none"} !important;
  border-collapse: collapse;
  background-color: ${({ $isActive, $color }) => $isActive ? $color : "transparent"};

  img {
    width: 25px;
    height: 25px;
  }

  .title {
    color: ${({ $isActive }) => $isActive ? "var(--txt-1)" : "var(--txt-5)"};
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0;
  }

  .sub-title {
    color: ${({ $isActive }) => $isActive ? "var(--txt-1)" : "var(--txt-6)"};
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`