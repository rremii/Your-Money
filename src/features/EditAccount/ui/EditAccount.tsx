import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useEditAccount } from "@entities/Account/model/useEditAccount.tsx"
import { memo, useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import SubmitIcon from "@icons/general/done.svg?react"

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
      <SubmitIcon className="icon" />
    </EditAccountLayout>
  )
})
const EditAccountLayout = styled.button`
    .icon {
        fill: white;
        width: 25px !important;
        height: 25px !important;
    }
`
