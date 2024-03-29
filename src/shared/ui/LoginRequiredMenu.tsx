import styled from "styled-components"
import { FC } from "react"
import PreloaderIcon from "@icons/general/preloader.svg?react"

interface props {
  nodeRef?: (node?: Element | null | undefined) => void
}

export const LoginRequiredMenu: FC<props> = ({ nodeRef }) => {
  return (
    <LoginRequiredMenuLayout className="LoginRequiredMenu" ref={nodeRef}>
      <PreloaderIcon className="preloader" />
      <h2>Please login to get an access to the page</h2>
    </LoginRequiredMenuLayout>
  )
}
const LoginRequiredMenuLayout = styled.div`
    scroll-snap-stop: always;
    scroll-snap-align: center;
    min-width: 100%;
    flex: 0 1 100%;
    max-height: calc(100vh - 55px);
    gap: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--main-bg);

    h2 {
        font-family: Inter, sans-serif;
        font-size: 15px;
        color: var(--sub-txt);
    }

    .preloader {
        width: 100px !important;
        color: #401db0;
    }
`
