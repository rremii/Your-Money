import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useLazyGetMeQuery } from "@entities/User/api/UserApi.ts"
import React, { useEffect } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IsCurDateToday } from "@entities/DateSlider/model/DateSliderSlice.ts"

const time =
  new Date().getHours() +
  ":" +
  new Date().getMinutes().toString().padStart(2, "0")

export const SideBarHeader = React.memo(() => {
  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)
  const isCurDateToday = useTypedSelector(IsCurDateToday)

  const [getMe, { data: userInfo }] = useLazyGetMeQuery()

  useEffect(() => {
    if (isLoggedIn !== "success") return
    getMe()
  }, [getMe, isLoggedIn])

  const GetSectionsData = () => {
    if (isLoggedIn === "success") {
      return {
        avatar: userInfo?.avatar || Categories,
        email: userInfo?.email,
        name: userInfo?.name,
        time: "Today, " + time,
      }
    } else {
      return {
        avatar: Categories,
        email: "Synchronization disabled...",
        name: "SIGN IN",
        time: "Synchronization...",
      }
    }
  }

  return (
    <HeaderLayout $isActive={isCurDateToday}>
      <div className="avatar-box">
        <img className="avatar" src={GetSectionsData().avatar} alt="avatar" />
        <div className="extra-info">
          <div className="date">{GetSectionsData().time}</div>
          <img src={Categories} alt="cloud" />
        </div>
      </div>
      <div className="user-info">
        <h2 className="name">{GetSectionsData().name}</h2>
        <h3 className="email">{GetSectionsData().email}</h3>
      </div>
    </HeaderLayout>
  )
})
const HeaderLayout = styled.header<{
  $isActive?: boolean
}>`
  padding-left: 20px;
  width: 100%;
  flex: 0 0 135px;
  background-color: var(--account-color);
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
      border-radius: 50%;
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
