export interface ApiError {
  message: string
  name: string
  options: object
  response: { statusCode: number, message: string, error: string }
  status: number
}

