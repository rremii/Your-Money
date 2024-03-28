import styled from "styled-components"
import { NavLink } from "react-router-dom"
import React, { FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { Global } from "@shared/type"

interface props {
  href: string
  name: string
  Icon: Global.svgComponent,
  OnClick: () => void
}

export const Link: FC<props> = memo(
  ({ Icon, name, href, OnClick }) => {
    const { t } = useTranslation()
    const translatingPath = ("general." +
      name.toLowerCase()) as "general.overview"

    return (
      <LinkLayout onClick={OnClick} to={href} className="link">
        <Icon className="icon" />
        <h3>{t(translatingPath)}</h3>
      </LinkLayout>
    )
  }
)
const LinkLayout = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 7px 0;
    gap: 3px;
    transition: 0.5s;

    &.active {
        transform: translateY(-2px);

        .icon {
            fill: #5c6ac0;
        }

        h3 {
            color: #5c6ac0;
        }
    }

    .icon {
        transition: 0.5s;
        fill: var(--main-txt);
        width: 25px;
        height: 25px;
    }

    h3 {
        transition: 0.5s;
        color: var(--main-txt);
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`
