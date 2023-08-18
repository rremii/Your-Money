export const RoundDecimal = (number: number, length: number = 1) => {
  const numberStr = number.toString()
  if (!numberStr.includes(".")) return number

  const integerPart = numberStr.split(".")[0]
  const decimalPart = numberStr.split(".")[1]

  const roundedDecimal = Math.round(+decimalPart.slice(0, length))

  return Number(integerPart + "." + roundedDecimal)
}