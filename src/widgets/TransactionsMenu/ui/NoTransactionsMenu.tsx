import styled from "styled-components"
import { FC } from "react"
import Caregories from "/icons/general/categories.svg"
import NoTransIcon from "@icons/general/no-transactions.svg?react"

interface props {
  nodeRef?: (node?: Element | null | undefined) => void
}

export const NoTransactionsSection: FC<props> = ({ nodeRef }) => {
  return (
    <NoTransactionsLayout ref={nodeRef}>
      <NoTransIcon className="icon" />
      <h2>No transactions yet</h2>
    </NoTransactionsLayout>
  )
}
const NoTransactionsLayout = styled.div`
    flex: 0 1 100%;
    background-color: var(--main-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    h2 {
        font-family: Inter, sans-serif;
        font-size: 15px;
        color: var(--sub-txt);
    }

    .icon {
        height: min-content;
        width: 250px !important;
        box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);

        #background {
            fill: var(--sub-bg-2) !important;
        }
    }

`
