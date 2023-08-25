import styled from "styled-components"
import Google from "@shared/assets/LightTheme/google.svg"
import React from "react"
import { NavLink } from "react-router-dom"
import { API_URL } from "@shared/api/config"


export const GoogleAuthUrl = API_URL + "/google/login"

export const GoogleAuth = () => {

  return (
    <GoogleAuthLayout to={GoogleAuthUrl}>
      <img src={Google} alt="google" />
      Google
    </GoogleAuthLayout>
  )
}
const GoogleAuthLayout = styled(NavLink)`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-1);
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.7);
  color: var(--txt-6);
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: relative;

  img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 22px;
    transform: translateY(-50%);
  }
`
