import styled from "styled-components"
import { NavLink } from "react-router-dom"
import React, { FC, memo } from "react"

interface props {
  href: string
  name: string
  src: string
  srcActive: string
  OnClick: () => void
}

export const Link: FC<props> = memo(
  ({ src, srcActive, name, href, OnClick }) => {
    return (
      <LinkLayout onClick={OnClick} to={href} className="link">
        <div className="icon">
          <img src={src} alt={name} />
          <img className="active" src={srcActive} alt={name} />
        </div>
        <h3>{name}</h3>
      </LinkLayout>
    )
  },
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
      img.active {
        opacity: 1;
      }
    }

    h3 {
      color: var(--txt-3);
    }
  }

  .icon {
    position: relative;
    width: 25px;
    height: 25px;

    img.active {
      transition: 0.5s;

      top: 0;
      left: 0;
      position: absolute;
      opacity: 0;
    }

    img {
      width: 100%;
    }
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
