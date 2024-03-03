import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useDeleteAccount } from "@entities/Account/model/useDeleteAccount.tsx"
//todo make validation (not allowing to send many req while pending) create delete edit category/account
export const DeleteAccount = () => {
  const dispatch = useAppDispatch()

  const id = useTypedSelector((state) => state.NewAccount.id)

  const { DeleteAccount, isLoading } = useDeleteAccount()

  const OnClick = async () => {
    if (id) {
      await DeleteAccount(id)
      dispatch(closeMenu("editCreateAccountMenu"))
    }
  }

  return (
    <DeleteCategoryLayout disabled={isLoading} onClick={OnClick}>
      <img src={Categories} alt="delete icon" className="icon" />
      <p className="content">Delete account</p>
    </DeleteCategoryLayout>
  )
}
const DeleteCategoryLayout = styled.button`
  cursor: pointer;
  background-color: var(--sub-bg);
  height: 60px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 20px;
  gap: 30px;
  box-shadow: 0 2px 5px 0 #0000003f;

  .icon {
    width: 15px;
  }

  .content {
    color: #ba4c4b;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
