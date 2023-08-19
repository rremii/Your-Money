import { useState } from "react"
import { TransactionType } from "@entities/Transaction/types.ts"

export const useMenuType = () => {
  const [menuType, setMenuType] = useState<TransactionType>("expense")

  const SwitchMenuType = () => {
    if (menuType === "expense") setMenuType("income")
    if (menuType === "income") setMenuType("expense")
  }
  return { SwitchMenuType, menuType }
}