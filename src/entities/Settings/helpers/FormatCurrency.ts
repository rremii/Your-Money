import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"

const FormatQuantity = (quantity: number, template: string): string => {
  const quantityStr = String(quantity)
  let resStr = ""

  const [integerPart, fractionalPart] = quantityStr.split(".")

  const intPartArr = []
  for (let i = 0; i < integerPart.length; i += 3) {
    intPartArr.push(integerPart.slice(i, i + 3))
  }
  switch (template) {
    case "quantity_coma":
      resStr = intPartArr.join(",")
      if (fractionalPart) resStr += "." + fractionalPart
      break
    case "quantity_space":
      resStr = intPartArr.join(" ")
      if (fractionalPart) resStr += "." + fractionalPart
      break
    case "quantity_point": {
      resStr = intPartArr.join(".")
      if (fractionalPart) resStr += "," + fractionalPart
      break
    }
  }
  return resStr
}
type props = {
  quantity: number
  currencySign: string
  sign: "+" | "-" | ""
  formatString: string
}
export const FormatCurrencyString = ({
  formatString,
  currencySign,
  quantity,
  sign,
}: props) => {
  const resSting = formatString

  let quantityFormat = ""

  if (formatString.includes("quantity_coma")) quantityFormat = "quantity_coma"
  if (formatString.includes("quantity_space")) quantityFormat = "quantity_space"
  if (formatString.includes("quantity_point")) quantityFormat = "quantity_point"

  const roundedQuantity = Math.abs(RoundDecimal(quantity, 2))
  const resQuantity = FormatQuantity(roundedQuantity, quantityFormat)
  return resSting
    .replace("{currency}", currencySign)
    .replace("{sign}", sign)
    .replace("{" + quantityFormat + "}", resQuantity)
}
