import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useLazyGetMeQuery } from "@entities/User/api/UserApi.ts"
import { useEffect } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"


export const SideBarHeader = () => {
  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)


  const [getMe, { data: userInfo }] = useLazyGetMeQuery()

  useEffect(() => {
    if (isLoggedIn !== "success") return
    getMe()
  }, [getMe, isLoggedIn])


  return <HeaderLayout>
    <div className="avatar-box">
      <img className="avatar" src={Categories} alt="avatar" />
      <div className="extra-info">
        <div className="date">{isLoggedIn === "success" ? "Today, 10:03" : "Synchronization..."}</div>
        <img src={Categories} alt="cloud" />
      </div>
    </div>
    <div className="user-info">
      <h2 className="name">{isLoggedIn === "success" ? "Remi" : "SIGN IN"}</h2>
      <h3 className="email">{isLoggedIn === "success" ? userInfo?.email : "Synchronization disabled..."}</h3>
    </div>
  </HeaderLayout>
}
const HeaderLayout = styled.header`
  padding-left: 20px;
  width: 100%;
  flex: 0 0 135px;
  background-color: var(--bg-3);
  padding-top: 35px;
  padding-right: 15px;

  .avatar-box {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;

    .avatar {
      width: 40px;
      height: 40px;
    }

    .extra-info {
      display: flex;
      align-items: center;
      gap: 25px;

      .date {
        color: var(--txt-1);
        font-family: Inter;
        font-size: 13px;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
      }

      img {
        width: 25px;
      }
    }
  }

  .user-info {
    .name,
    .email {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .name {
      font-size: 16px;
    }
  }

`