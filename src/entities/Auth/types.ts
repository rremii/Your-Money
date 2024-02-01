export type AuthResponse = {
  accessToken: string
}

export interface DefaultResponse {
  message: string
}

export interface ErrorResponse extends DefaultResponse {
  name: string
  response: {
    message: string
    error: string
    statusCode: number
  }
}

export type RegisterDto = {
  email: string
  password: string
}

export type LoginDto = {
  email: string
  password: string
}