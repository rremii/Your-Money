import { useEffect } from "react"
import {
  closeMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { resetEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { resetTransCalculator } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useCloseTransMenu = (isLoading: boolean, isSuccess: boolean) => {
  const dispatch = useAppDispatch()
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.menuType,
  )

  useEffect(() => {
    if (!isLoading && isSuccess) CloseMenu()
  }, [dispatch, isLoading, isSuccess])

  const CloseMenu = () => {
    dispatch(closeMenu("editCreateTransMenu"))
    dispatch(setEditCreateMenuType(menuType))
    dispatch(resetEditTransaction())
    dispatch(resetTransCalculator())
  }
}
