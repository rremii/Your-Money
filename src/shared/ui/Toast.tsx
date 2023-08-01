import styled from "styled-components"
import React from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const Toast: React.FC = () => {

  const isShown = useTypedSelector(state => state.Toast.isShown)
  const message = useTypedSelector(state => state.Toast.message)

  return (
    <ToastShowZone>
      <ToastLayout $isShown={isShown}>
        <p>{message}</p>
      </ToastLayout>
    </ToastShowZone>
  )
}
const ToastShowZone = styled.div`

  position: fixed;
  bottom: 55px;
  left: 0;
  background-color: transparent;
  height: 200px;
  overflow: hidden;
  width: 100vw;
  z-index: 5;
  pointer-events: none;
`
const ToastLayout = styled.div<{
  $isShown?: boolean
}>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: ${({ $isShown }) => $isShown ? "translateY(calc(-100% - 20px))" : ""} translateX(-50%);
  background-color: var(--bg-1);
  box-shadow: 0px 2px 5px 0px var(--shadow-1);

  max-width: 320px;
  width: calc(100vw - 52px);
  transition: .7s;
  border-radius: 5px;
  padding: 17px 22px;

  p {
    color: var(--txt-6);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }




`