export interface IUserInfo {
  id: number
  email: string
  name: string
  avatar?: string
}

export interface ChangeNameDto {
  id: number
  newName: string
}

export interface ChangePasswordDto {
  id: number
  hashedPassword: string
}