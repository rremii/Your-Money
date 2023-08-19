import { useState } from "react"
import { ITransaction } from "@entities/Transaction/types.ts"

export const useMenuType = () => {
  const [menuType, setMenuType] = useState<Pick<ITransaction, "type">>("expense")

  const SwitchMenuType = () => {
    if (menuType === "expense") setMenuType("income")
    if (menuType === "income") setMenuType("expense")
  }
  return { SwitchMenuType, menuType }
}