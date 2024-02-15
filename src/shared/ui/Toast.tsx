import styled from "styled-components"
import React from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { toastStateType } from "@shared/store/globalSlices/ToastSlice.ts"

export const Toast: React.FC = React.memo(() => {
  const isShown = useTypedSelector((state) => state.Toast.isShown)
  const message = useTypedSelector((state) => state.Toast.message)
  const state = useTypedSelector((state) => state.Toast.state)

  return (
    <ToastShowZone>
      <ToastLayout $toastState={state} $isShown={isShown}>
        <p>{message}</p>
      </ToastLayout>
    </ToastShowZone>
  )
})
const ToastShowZone = styled.div`
  position: fixed;
  bottom: 55px;
  left: 0;
  background-color: transparent;
  height: 200px;
  overflow: hidden;
  width: 100vw;
  z-index: 500;
  pointer-events: none;
`
const ToastLayout = styled.div<{
  $isShown?: boolean
  $toastState?: toastStateType
}>`
  position: absolute;
  top: 105%;
  left: 50%;
  transform: ${({ $isShown }) =>
      $isShown ? "translateY(calc(-100% - 20px))" : ""}
    translateX(-50%);
  background-color: var(--sub-bg);
  box-shadow: ${({ $toastState }) =>
    ($toastState === "info" && "0px 2px 5px 0px var(--shadow-1)") ||
    ($toastState === "error" && "0px 2px 5px 0px var(--shadow-4)")};

  max-width: 320px;
  width: calc(100vw - 52px);
  transition: 0.7s;
  border-radius: 5px;
  padding: 17px 22px;

  p {
    color: ${({ $toastState }) =>
      ($toastState === "info" && "var(--main-txt)") ||
      ($toastState === "error" && "var(--txt-14)")};

    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
