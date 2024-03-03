import styled from "styled-components"
import { FC } from "react"

interface props {
  onClick: () => void
  icon: string
  title: string
  subTitle?: string
}

export const SideBarBtn: FC<props> = ({ onClick, title, subTitle, icon }) => {
  return (
    <BtnLayout onClick={onClick} className="SideBarBtn cell">
      <img src={icon} alt="icon" />
      <div className="text-info">
        <h3>{title}</h3>
        {subTitle && <h4>{subTitle}</h4>}
      </div>
    </BtnLayout>
  )
}
const BtnLayout = styled.button`
  cursor: pointer;
  display: flex;
  flex: 0 0 60px;
  width: 100%;
  gap: 17px;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  .text-info {
    border-bottom: 1px rgba(109, 108, 108, 0.24) solid;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-direction: column;
    height: 100%;

    h3 {
      color: var(--sub-txt);
      text-align: left;
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    h4 {
      text-transform: capitalize;
      color: #606ca6;
      text-align: left;
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
