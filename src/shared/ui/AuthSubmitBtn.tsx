import styled from "styled-components"
import { FC } from "react"

interface props {
  children: React.ReactNode
  isLoading?: boolean
}

export const AuthSubmitBtn: FC<props> = ({ children, isLoading }) => {
  return (
    <ButtonLayout
      type="submit"
      $isLoading={isLoading}
      className="AuthSubmitBtn"
    >
      {children}
    </ButtonLayout>
  )
}
const ButtonLayout = styled.button<{
  $isLoading?: boolean
}>`
  width: 100%;

  height: 45px;
  border-radius: 5px;
  background: ${({ $isLoading }) => ($isLoading ? "#1b77c0" : "#2196F3")};
  color: #ffffff;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
