export type AuthResponse = {
  accessToken: string
}

export type DefaultResponse = {
  message: string
}

export type RegisterDto = {
  email: string
  password: string
}
export type LoginDto = {
  email: string
  password: string
}