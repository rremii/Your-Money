import { SubmitBtn } from "@features/Calculator/ui/SubmitBtn.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCreateTransaction } from "@entities/Transaction/model/useCreateTransaction.tsx"
import { useEditTransaction } from "@entities/Transaction/model/useEditTransaction.tsx"
import { useEffect } from "react"
import {
  closeMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { resetEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { resetTransCalculator } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"

export const EditTransaction = () => {
  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )

  const { EditTransaction, isLoading, isSuccess } = useEditTransaction()
  useCloseTransMenu(isLoading, isSuccess)

  const OnSubmit = async () => {
    await EditTransaction()
  }

  return (
    <SubmitBtn bgColor={color} isLoading={isLoading} OnClick={OnSubmit}>
      OK
    </SubmitBtn>
  )
}
