import styled from "styled-components"
import { FC } from "react"

interface props {
  Icon: React.ReactNode
  title: string
  subTitle?: string
  isActive?: boolean
  color?: string
  OnClick?: () => void
}

export const PickDateBtn: FC<props> = ({
                                         title,
                                         subTitle,
                                         Icon,
                                         isActive,
                                         color,
                                         OnClick
                                       }) => {
  return (
    <PickDateBtnLayout
      onClick={OnClick}
      $isActive={isActive}
      $color={color}
      className="PickDateBtn"
    >
      {Icon}
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

    .icon {
        fill: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "var(--main-txt)")};
        width: 25px !important;
        height: 25px !important;
        margin-bottom: 5px;
    }

    .title {
        color: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "var(--sub-txt)")};
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 3px;
    }

    .sub-title {
        color: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "#818181")};
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
    }
`
