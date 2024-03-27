import styled from "styled-components"
import { FC } from "react"
import Caregories from "../../../public/icons/general/categories.png"

interface props {
  nodeRef?: (node?: Element | null | undefined) => void
}

export const LoginRequiredMenu: FC<props> = ({ nodeRef }) => {
  return (
    <LoginRequiredMenuLayout className="LoginRequiredMenu" ref={nodeRef}>
      <img src={Caregories} alt="Login Required" />
    </LoginRequiredMenuLayout>
  )
}
const LoginRequiredMenuLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  min-width: 100%;
  flex: 0 1 100%;
  max-height: calc(100vh - 55px);

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--main-bg);
`
