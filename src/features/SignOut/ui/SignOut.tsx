import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { Menus, openMenu } from "@entities/SideBar/model/SideBarSlice.ts"

export const SignOut = () => {
  const dispatch = useAppDispatch()


  const OnClick = () => {
    dispatch(openMenu(Menus.signOut))
  }

  return <SideBarBtn onClick={OnClick} title="Sign out" icon={Categories} />
}
