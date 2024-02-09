import bcrypt from "bcryptjs"

export const HashData = (data: string): Promise<string> => {
  return bcrypt.hash(data, 5)
}
