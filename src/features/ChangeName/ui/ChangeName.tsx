import { SideBarBtn } from "@shared/ui/SideBarBtn.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useGetMeQuery } from "@entities/User/api/UserApi.ts"

export const ChangeName = () => {


  const { data: userInfo } = useGetMeQuery()


  const handleClick = () => {

  }

  return <SideBarBtn onClick={handleClick} title="Name" subTitle={userInfo?.name} icon={Categories} />
}
