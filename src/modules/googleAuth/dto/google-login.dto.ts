import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class GoogleLoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  avatar?: string
}
