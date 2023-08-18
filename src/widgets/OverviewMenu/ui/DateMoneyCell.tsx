import styled from "styled-components"
import { FC } from "react"

interface props {
  title: string
  quantity: number
}

export const DateMoneyCell: FC<props> = ({ quantity, title }) => {


  return <CellLayout>
    <h3 className="date">{title}</h3>
    <p className="quantity">-Br {quantity}</p>
  </CellLayout>
}
const CellLayout = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-8);
  height: 46px;
  border: 1px solid var(--bg-2);
  gap: 3px;

  .date {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .quantity {
    color: var(--txt-8);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`