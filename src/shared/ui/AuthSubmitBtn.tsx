import styled from "styled-components"
import { FC } from "react"

interface props {
  children: React.ReactNode
}

export const AuthSubmitBtn: FC<props> = ({ children }) => {
  return (
    <ButtonLayout type="submit" className="AuthSubmitBtn">
      {children}
    </ButtonLayout>
  )
}
const ButtonLayout = styled.button`
  width: 100%;

  height: 45px;
  border-radius: 5px;
  background: var(--bg-4);
  color: var(--txt-1);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
