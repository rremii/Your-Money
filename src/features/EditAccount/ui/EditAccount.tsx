import styled from "styled-components"
import Categories from "../../../../public/icons/general/categories.png"
import { useEditAccount } from "@entities/Account/model/useEditAccount.tsx"
import { memo, useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

export const EditAccount = memo(() => {
  const dispatch = useAppDispatch()

  const { EditAccount, isSuccess, isPending } = useEditAccount()

  useEffect(() => {
    if (!isPending && isSuccess) dispatch(closeMenu("editCreateAccountMenu"))
  }, [dispatch, isPending, isSuccess])

  const Edit = async () => {
    await EditAccount()
  }

  return (
    <EditAccountLayout
      disabled={isPending}
      onClick={Edit}
      className={"EditAccount"}
    >
      <img src={Categories} alt="edit" />
    </EditAccountLayout>
  )
})
const EditAccountLayout = styled.button`
  img {
    width: 100%;
    height: 100%;
  }
`
