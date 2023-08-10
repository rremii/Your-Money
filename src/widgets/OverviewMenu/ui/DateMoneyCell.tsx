import styled from "styled-components"

export const DateMoneyCell = () => {
  return <CellLayout>
    <h3 className="date">Day (avg.)</h3>
    <p className="quantity">-Br 20</p>
  </CellLayout>
}
const CellLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-8);
  height: 45px;
  border: 1px solid var(--bg-2);

  .date {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .quantity {
    color: var(--txt-8);
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`