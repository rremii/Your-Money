import { SubmitBtn } from "@features/Calculator/ui/SubmitBtn.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCreateTransaction } from "@entities/Transaction/model/useCreateTransaction.tsx"
import {
  closeMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { resetEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { resetTransCalculator } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { useEffect } from "react"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"

export const CreateTransaction = () => {
  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color,
  )

  const { CreateTransaction, isLoading, isSuccess } = useCreateTransaction()
  useCloseTransMenu(isLoading, isSuccess)

  const OnSubmit = async () => {
    await CreateTransaction()
  }

  return (
    <SubmitBtn bgColor={color} isLoading={isLoading} OnClick={OnSubmit}>
      OK
    </SubmitBtn>
  )
}
