import { SubmitBtn } from "@features/Calculator/ui/SubmitBtn.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useEditTransaction } from "@entities/Transaction/model/useEditTransaction.tsx"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"
import DoneIcon from "@icons/general/done.svg?react"

export const EditTransaction = () => {
  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color
  )

  const { EditTransaction, isLoading, isSuccess } = useEditTransaction()
  useCloseTransMenu(isLoading, isSuccess)

  const OnSubmit = async () => {
    await EditTransaction()
  }

  return (
    <SubmitBtn bgColor={color} isLoading={isLoading} OnClick={OnSubmit}>
      <DoneIcon />
    </SubmitBtn>
  )
}
