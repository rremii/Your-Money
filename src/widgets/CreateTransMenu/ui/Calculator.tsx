import styled from "styled-components"
import { CalculatorBtn } from "@widgets/CreateTransMenu/ui/CalculatorBtn.tsx"
import { OperationBtn } from "@widgets/CreateTransMenu/ui/OperationBtn.tsx"
import { DigitBtn } from "@widgets/CreateTransMenu/ui/DigitBtn.tsx"
import { SubmitBtn } from "@widgets/CreateTransMenu/ui/SubmitBtn.tsx"

export const Calculator = () => {

  return <CalculatorLayout>
    <OperationBtn OnClick={() => undefined}>X</OperationBtn>
    <DigitBtn OnClick={() => undefined}>8</DigitBtn>
    <SubmitBtn bgColor={"#795547"} OnClick={() => undefined}>Ok</SubmitBtn>
  </CalculatorLayout>
}
const CalculatorLayout = styled.div`

  background-color: var(--bg-1);

`