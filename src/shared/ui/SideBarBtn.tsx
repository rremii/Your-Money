import styled from "styled-components"
import { FC } from "react"
import { Global } from "@shared/type"

interface props {
  onClick: () => void
  Icon: Global.svgComponent
  title: string
  subTitle?: string
}

export const SideBarBtn: FC<props> = ({ onClick, title, subTitle, Icon }) => {
  return (
    <BtnLayout onClick={onClick} className="SideBarBtn cell">
      <Icon className="icon" />
      <div className="text-info">
        <h3>{title}</h3>
        {subTitle && <p>{subTitle}</p>}
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

    .icon {
        width: 25px !important;
        fill: var(--main-txt) !important;
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

        p {
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
