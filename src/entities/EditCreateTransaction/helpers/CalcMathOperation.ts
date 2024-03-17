import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

export type MathOperatorType = "mul" | "sub" | "div" | "sum" | null

export const CalcMathOperation = (
  arg: number[],
  operator: MathOperatorType,
) => {
  switch (operator) {
    case "mul":
      return RoundDecimal(arg.reduce((acc, cur) => acc * cur, 1))
    case "div":
      return RoundDecimal(arg.reduce((acc, cur) => acc / cur))
    case "sub":
      return RoundDecimal(arg.reduce((acc, cur) => acc - cur))
    case "sum":
      return RoundDecimal(arg.reduce((acc, cur) => acc + cur, 0))
    default:
      return arg[0]
  }
}

export const MathOperatorSign = new Map<string, string>()
MathOperatorSign.set("div", "÷")
MathOperatorSign.set("sub", "-")
MathOperatorSign.set("sum", "+")
MathOperatorSign.set("mul", "×")
