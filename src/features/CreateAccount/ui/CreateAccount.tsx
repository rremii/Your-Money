import styled from "styled-components"
import Categories from "../../../../public/icons/general/categories.png"
import { useCreateAccount } from "@entities/Account/model/useCreateAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { memo, useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

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
      <img src={Categories} alt="create" />
    </CreateAccountLayout>
  )
})
const CreateAccountLayout = styled.button`
  img {
    width: 100%;
    height: 100%;
  }
`
