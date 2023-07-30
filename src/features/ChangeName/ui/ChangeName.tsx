import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { GetMe, useGetMeQuery } from "@entities/User/api/UserApi.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { Menus, openMenu } from "@entities/SideBar/model/SideBarSlice.ts"

export const ChangeName = () => {
  const dispatch = useAppDispatch()


  const { data: userInfo } = GetMe.useQueryState()


  const handleClick = () => {
    dispatch(openMenu(Menus.name))
  }

  return <SideBarBtn onClick={handleClick} title="Name" subTitle={userInfo?.name} icon={Categories} />
}
