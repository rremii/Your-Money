import styled from "styled-components"
import React from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { Spinner } from "@shared/ui/Spinner/Spinner.tsx"

export const LoadingToast: React.FC = React.memo(() => {
  const isShown = useTypedSelector((state) => state.Toasts.LoadingToast.isShown)
  const message = useTypedSelector((state) => state.Toasts.LoadingToast.message)

  return (
    <>
      <Overlay $zIndex={55} $isActive={isShown} />
      <ToastLayout $isShown={isShown}>
        <Spinner color={"var(--sub-txt)"} size={25} />
        <p>{message}</p>
      </ToastLayout>
    </>
  )
})

const ToastLayout = styled.div<{
  $isShown?: boolean
}>`
  display: flex;
  transition: 0.5s;
  opacity: ${({ $isShown }) => ($isShown ? 1 : 0)};
  pointer-events: ${({ $isShown }) => ($isShown ? "initial" : "none")};
  border-radius: 3px;
  z-index: 55;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--sub-bg);

  justify-content: center;
  align-items: center;
  padding: 15px 25px;
  width: max-content;
  gap: 10px;
  max-width: 300px;

  p {
    color: var(--sub-txt);
    font-size: 16px;
    font-family: Inter, sans-serif;
    font-weight: 500;
  }
`
