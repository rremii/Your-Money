import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { resetEditAccount } from "@entities/Account/model/NewAccountSlice.ts"
import { CreateAccount } from "@features/CreateAccount/ui/CreateAccount.tsx"
import { EditAccount } from "@features/EditAccount/ui/EditAccount.tsx"

export const EditAccountHeader = () => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateAccountMenu.menuType,
  )

  const CloseAccountMenu = async () => {
    dispatch(closeMenu("editCreateAccountMenu"))
    let timer: NodeJS.Timeout | null = null
    await new Promise((resolve) => {
      timer = setTimeout(() => {
        dispatch(resetEditAccount())
        resolve("")
      }, 500)
    })

    if (timer) return window.clearTimeout(timer)
  }

  return (
    <HeaderLayout>
      {menuType === "create" && (
        <img
          className="cancel"
          onClick={CloseAccountMenu}
          src={Categories}
          alt="cancel"
        />
      )}
      {menuType === "edit" && (
        <img
          className="arrow"
          onClick={CloseAccountMenu}
          src={Categories}
          alt="back"
        />
      )}

      <h1 className="title">
        {menuType === "create" ? "New account" : "Edit account"}
      </h1>

      {menuType === "create" ? <CreateAccount /> : <EditAccount />}
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header`
  height: 50px;
  display: flex;
  padding: 0 18px;
  align-items: center;

  .cancel,
  .EditAccount,
  .CreateAccount,
  .arrow {
    width: 17px;
    height: 17px;
    //background-color: red;
  }

  .title {
    margin-left: 30px;
    flex: 1 1 auto;
    color: #ffffff;
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
