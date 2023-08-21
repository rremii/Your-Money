import { useCallback, useMemo, useState } from "react"
import { TransactionType } from "@entities/Transaction/types.ts"

export const useMenuType = () => {
  const [menuType, setMenuType] = useState<TransactionType>("expense")

  const SwitchMenuType = useCallback(() => {
    setMenuType((menuType) => menuType === "income" ? "expense" : "income")
  }, [])

  return useMemo(() => ({
    SwitchMenuType, menuType
  }), [SwitchMenuType, menuType])
}