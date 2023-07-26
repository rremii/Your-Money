import { IsEmail, IsNotEmpty } from "class-validator"

export class GoogleLoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string
}
