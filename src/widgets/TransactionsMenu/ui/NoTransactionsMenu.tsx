import styled from "styled-components"
import { FC } from "react"
import Caregories from "../../../../public/icons/general/categories.png"

interface props {
  nodeRef?: (node?: Element | null | undefined) => void
}

export const NoTransactionsSection: FC<props> = ({ nodeRef }) => {
  return (
    <NoTransactionsLayout ref={nodeRef}>
      <img src={Caregories} alt="no transactions" />
    </NoTransactionsLayout>
  )
}
const NoTransactionsLayout = styled.div`
  flex: 0 1 100%;
  background-color: var(--main-bg);
  display: flex;
  justify-content: center;
  align-items: center;
`
