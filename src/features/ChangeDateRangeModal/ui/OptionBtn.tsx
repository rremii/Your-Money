import styled from "styled-components"
import { FC, ReactNode } from "react"

interface props {
  icon: ReactNode
  title: string
  OnClick?: () => void
  subTitle?: string
  isActive?: boolean
}

export const OptionBtn: FC<props> = ({
  icon,
  subTitle,
  title,
  isActive,
  OnClick,
}) => {
  return (
    <OptionBtnLayout $isActive={isActive} onClick={OnClick}>
      {icon}
      <h2>{title}</h2>
      {subTitle && <p>{subTitle}</p>}
    </OptionBtnLayout>
  )
}
const OptionBtnLayout = styled.button<{
  $isActive?: boolean
}>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  border: rgba(166, 166, 166, 0.14) 1px solid;

  img {
    width: 30px;
  }

  h2 {
    font-weight: 400;
    font-size: 14px;
    color: var(--sub-txt);
    font-family: Inter, sans-serif;
  }

  p {
    font-family: Inter, sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: var(--main-txt);
  }
`
