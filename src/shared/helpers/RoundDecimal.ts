export const RoundDecimal = (number?: number, length: number = 1) => {
  if (!number) return 0
  const numberStr = number.toString()
  if (!numberStr.includes(".")) return number

  const [integerPart, fractionalPart] = numberStr.split(".")

  const roundedDecimal = Math.round(+fractionalPart.slice(0, length))

  return Number(integerPart + "." + roundedDecimal)
}