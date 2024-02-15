import styled from "styled-components"
import { FC } from "react"

interface props {
  img: string
  title: string
  subTitle?: string
  isActive?: boolean
  color?: string
  OnClick?: () => void
}

export const PickDateBtn: FC<props> = ({
  title,
  subTitle,
  img,
  isActive,
  color,
  OnClick,
}) => {
  return (
    <PickDateBtnLayout
      onClick={OnClick}
      $isActive={isActive}
      $color={color}
      className="PickDateBtn"
    >
      <img src={img} alt="icon" />
      <h2 className="title">{title}</h2>
      <p className="sub-title">{subTitle}</p>
    </PickDateBtnLayout>
  )
}
const PickDateBtnLayout = styled.button<{
  $isActive?: boolean
  $color?: string
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //gap: 3px;
  padding: 10px;
  border: ${({ $isActive }) => $isActive && "none"} !important;
  border-collapse: collapse;
  background-color: ${({ $isActive, $color }) =>
    $isActive ? $color : "transparent"};

  img {
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
  }

  .title {
    color: ${({ $isActive }) =>
      $isActive ? "var(--txt-1)" : "var(--sub-txt)"};
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 3px;
  }

  .sub-title {
    color: ${({ $isActive }) => ($isActive ? "var(--txt-1)" : "var(--txt-6)")};
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
  }
`
