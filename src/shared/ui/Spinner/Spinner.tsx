import styled from "styled-components"
import { FC } from "react"

interface props {
  size: number
  color: string
}

export const Spinner: FC<props> = ({
  size = 40,
  color = "rgb(39, 39, 158)",
}) => {
  const spinnerBorderWidth = size * 0.1
  const spinnerInnerSize = size / 2 + spinnerBorderWidth
  return (
    <SpinnerLayout
      $size={size}
      $color={color}
      $spinnerInnerSize={spinnerInnerSize}
      $spinnerBorderWidth={spinnerBorderWidth}
    >
      <div className="spinnerAnimationContainer">
        <div />
      </div>
    </SpinnerLayout>
  )
}

const SpinnerLayout = styled.div<{
  $size?: number
  $color?: string
  $spinnerBorderWidth?: number
  $spinnerInnerSize?: number
}>`
  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  overflow: hidden;

  .spinnerAnimationContainer div {
    position: absolute;
    width: ${({ $spinnerInnerSize }) => $spinnerInnerSize}px;
    height: ${({ $spinnerInnerSize }) => $spinnerInnerSize}px;
    border: ${({ $spinnerBorderWidth }) => $spinnerBorderWidth}px solid
      ${({ $color }) => $color || "transparent"};
    border-top-color: transparent;
    border-radius: 50%;
  }

  .spinnerAnimationContainer div {
    animation: spin 1s linear infinite;
    top: ${({ $size }) => ($size ? $size / 2 : 0)}px;
    left: ${({ $size }) => ($size ? $size / 2 : 0)}px;
  }

  .spinnerAnimationContainer {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

  .spinnerAnimationContainer div {
    box-sizing: content-box;
  }
`
