import styled from "styled-components"
import NoAvatarIcon from "@shared/assets/avatars/NoAvatarIcon.svg"
import { FC } from "react"
import { Avatars } from "@entities/Avatar/model/types"
import { AvatarSrc } from "@entities/Avatar/constants/AvatarsSrc"

interface props {
  avatar?: Avatars
  isActive: boolean
  onClick: (avatars: Avatars) => void
}

export const Avatar: FC<props> = ({ isActive = false, avatar = "noAvatar", onClick }) => {


  return <AvatarLayout onClick={() => onClick(avatar)} isActive={isActive}>
    <img src={AvatarSrc.get(avatar) || NoAvatarIcon} alt="avatar" />
  </AvatarLayout>
}
const AvatarLayout = styled.div<{
  isActive: boolean
}>`
  //width: 100%;
  height: 150px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    cursor: pointer;
    max-width: 150px;
    max-height: 150px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    filter: ${({ isActive }) => isActive ? "brightness(1)" : "brightness(0.3)"};
  }
`
