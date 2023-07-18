import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useMemo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setIsSideBar } from "@entities/SideBar"

//todo decomposite by header profile and so on
export const SideBar = () => {
  const dispatch = useAppDispatch()

  const isSideBar = useTypedSelector((state) => state.SideBar.isSideBarOpen)

  const CloseSideBar = () => {
    dispatch(setIsSideBar(false))
  }

  const SettingsSectionContent = useMemo(
    () => [
      { icon: Categories, title: "Language", subTitle: "Default" },
      { icon: Categories, title: "Theme", subTitle: "Light" },
      {
        icon: Categories,
        title: "Default currency",
        subTitle: "United States dollar",
      },
      { icon: Categories, title: "Currency format", subTitle: "-$ 1,123.90" },
      { icon: Categories, title: "First Day of week", subTitle: "Sunday" },
      { icon: Categories, title: "First day of month", subTitle: "1" },
      { icon: Categories, title: "Startup screen", subTitle: "Categories" },
    ],
    [],
  )
  const ProfileSectionContent = useMemo(
    () => [{ icon: Categories, title: "Sign in", subTitle: "" }],
    [],
  )

  return (
    <>
      <OverLay onClick={CloseSideBar} isSideBar={isSideBar} />
      <SideBarLayout isSideBar={isSideBar}>
        <div className="header">
          <div className="avatar-box">
            <img className="avatar" src={Categories} alt="avatar" />
            <div className="extra-info">
              <div className="date">Today, 10:03</div>
              <img src={Categories} alt="cloud" />
            </div>
          </div>
          <div className="user-info">
            <h2 className="name">Remi</h2>
            <h3 className="email">noruto2021@gmail.com</h3>
          </div>
        </div>
        <div className="profile">
          <div className="title">Profile</div>
          <div className="content">
            {ProfileSectionContent.map(({ icon, subTitle, title }) => (
              <div className="cell">
                <img src={icon} alt="icon" />
                <div className="text-info">
                  <h3>{title}</h3>
                  {subTitle && <h4>{subTitle}</h4>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="separator" />
        <div className="settings">
          <div className="title">Settings</div>
          <div className="content">
            {SettingsSectionContent.map(({ icon, subTitle, title }) => (
              <div className="cell">
                <img src={icon} alt="icon" />
                <div className="text-info">
                  <h3>{title}</h3>
                  {subTitle && <h4>{subTitle}</h4>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SideBarLayout>
    </>
  )
}
const SideBarLayout = styled.div<{
  isSideBar: boolean
}>`
  position: absolute;
  background-color: var(--bg-1);
  z-index: 10;
  top: 0;
  left: ${({ isSideBar }) => (isSideBar ? "0" : "-100%")};
  width: 75%;
  min-width: 270px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  transition: left 0.5s;

  .header {
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
          font-size: 14px;
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
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }

      .name {
        font-size: 17px;
      }
    }
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: var(--separator-1);
  }

  .profile,
  .settings {
    width: 100%;
    padding-left: 20px;

    .title {
      color: var(--txt-3);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 10px;
      margin-top: 17px;
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;

      .cell:last-child {
        .text-info {
          border-bottom: 1px transparent solid;
        }
      }

      .cell {
        cursor: pointer;
        display: flex;
        flex: 0 0 60px;
        width: 100%;
        gap: 17px;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
        }

        .text-info {
          border-bottom: 1px var(--separator-1) solid;
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          gap: 5px;
          flex-direction: column;
          height: 100%;

          h3 {
            color: var(--txt-5);
            font-family: Inter;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          h4 {
            color: var(--txt-4);
            font-family: Inter;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
      }
    }
  }
`
const OverLay = styled.div<{
  isSideBar: boolean
}>`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.68);
  opacity: ${({ isSideBar }) => (isSideBar ? 1 : 0)};
  pointer-events: ${({ isSideBar }) => (isSideBar ? "initial" : "none")};
  transition: 0.5s;
`
