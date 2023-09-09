import styled from "styled-components"

export const ResultQuantity = () => {
  return <QuantityLayout $color="#795547">
    <p className="type">Expense</p>
    <p className="quantity">$ 0</p>
  </QuantityLayout>
}
const QuantityLayout = styled.div<{
  $color?: string
}>`

  background-color: var(--bg-1);
  height: 75px;
  display: flex;
  gap: 9px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--bg-10);

  .type, .quantity {
    color: ${({ $color }) => $color || "var(--txt-3)"};
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .type {
    font-size: 11px;
  }

  .quantity {
    font-size: 25px;
  }
`