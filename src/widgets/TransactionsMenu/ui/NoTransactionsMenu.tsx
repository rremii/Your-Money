import styled from "styled-components"
import { FC } from "react"
import NoTransIcon from "@icons/general/no-transactions.svg?react"
import { useTranslation } from "react-i18next"

interface props {
  nodeRef?: (node?: Element | null | undefined) => void
}

export const NoTransactionsSection: FC<props> = ({ nodeRef }) => {
  const { t } = useTranslation()

  return (
    <NoTransactionsLayout ref={nodeRef}>
      <NoTransIcon className="icon" />
      <h2>{t("noTransactionsMenu")}</h2>
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
        max-width: 80%;
        text-align: center;
        line-height: 1.5;
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
