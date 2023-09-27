export const useCalculator = () => {
  // operator: MathOperatorType
  //   numberStr1: string
  //   numberStr2: string

  //removeLastNumber(state) {
  //       const operator = state.operator
  //       const quantityStr = String(state.quantity)
  //       const num1 = state.numberStr1
  //       const num2 = state.numberStr2
  //
  //       if (num2)
  //         state.numberStr2 = num2.slice(0, -1)
  //       else if (operator)
  //         state.operator = null
  //       else if (num1)
  //         state.numberStr1 = num1.slice(0, -1)
  //       else if (quantityStr)
  //         state.quantity = +quantityStr.slice(0, -1)
  //       else state.quantity = 0
  //     },
  //     addToNum(state, action: PayloadAction<number | string>) {
  //
  //       const operator = state.operator
  //       const num1 = state.numberStr1
  //       const num2 = state.numberStr2
  //
  //       if (action.payload === ".") {
  //         if (!operator) {
  //           if (num1.includes(".") || !num1) return
  //         } else {
  //           if (num2.includes(".") || !num2) return
  //         }
  //       }
  //       if (!operator) {
  //         const joinedNum = num1 + String(action.payload)
  //         state.numberStr1 = joinedNum
  //       } else {
  //         const joinedNum = num2 + String(action.payload)
  //         state.numberStr2 = joinedNum
  //       }
  //
  //     },
  //     setOperator(state, action: PayloadAction<MathOperatorType>) {
  //       const operator = state.operator
  //       const quantity = state.quantity
  //       const num1 = +state.numberStr1
  //       const num2 = +state.numberStr2
  //       if (!num1)
  //         state.numberStr1 = String(quantity)
  //       if (operator) {
  //         state.numberStr1 = String(CalcMathOperation([num1, num2], operator))
  //         state.numberStr2 = ""
  //       }
  //       state.operator = action.payload
  //
  //     },
  //     calcCalculatorQuantity(state) {
  //       const operator = state.operator
  //       const num1 = +state.numberStr1
  //       const num2 = +state.numberStr2
  //
  //       state.quantity = CalcMathOperation([num1, num2], operator)
  //       state.numberStr2 = ""
  //       state.numberStr1 = ""
  //       state.operator = null
  //     },

}