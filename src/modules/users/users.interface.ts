export interface IUser {
  id: number
  name: string
  email: string
  password?: string
  avatar?: string
  refreshToken?: string
}

export interface IUserInfo {
  id: number
  name: string
  email: string
  avatar?: string
}
