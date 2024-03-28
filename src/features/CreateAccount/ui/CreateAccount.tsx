import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useCreateAccount } from "@entities/Account/model/useCreateAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { memo, useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import SubmitIcon from "@icons/general/done.svg?react"

export const CreateAccount = memo(() => {
  const dispatch = useAppDispatch()

  const { data: user } = GetMe.useQueryState()
  const { CreateAccount, isSuccess, isPending } = useCreateAccount(user?.id)

  useEffect(() => {
    if (!isPending && isSuccess) dispatch(closeMenu("editCreateAccountMenu"))
  }, [dispatch, isPending, isSuccess])

  const Create = async () => {
    await CreateAccount()
  }

  return (
    <CreateAccountLayout
      disabled={isPending}
      onClick={Create}
      className={"CreateAccount"}
    >
      <SubmitIcon className="icon" />
    </CreateAccountLayout>
  )
})
const CreateAccountLayout = styled.button`
    .icon {
        fill: white;
        width: 25px !important;
        height: 25px !important;
    }
`
