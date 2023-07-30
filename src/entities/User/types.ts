export interface IUserInfo {
  id: number
  email: string
  name: string
  avatar?: string
}

export interface ChangeName {
  id: number
  newName: string
}

export interface ChangePassword {
  id: number
  hashedPassword: string
}