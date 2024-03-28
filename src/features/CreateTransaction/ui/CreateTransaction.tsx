import { SubmitBtn } from "@features/Calculator/ui/SubmitBtn.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCreateTransaction } from "@entities/Transaction/model/useCreateTransaction.tsx"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"
import DoneIcon from "@icons/general/done.svg?react"

export const CreateTransaction = () => {
  const color = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.color
  )

  const { CreateTransaction, isLoading, isSuccess } = useCreateTransaction()
  useCloseTransMenu(isLoading, isSuccess)

  const OnSubmit = async () => {
    await CreateTransaction()
  }

  return (
    <SubmitBtn bgColor={color} isLoading={isLoading} OnClick={OnSubmit}>
      <DoneIcon />
    </SubmitBtn>
  )
}
