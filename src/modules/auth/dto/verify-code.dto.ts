import { IsEmail, IsNotEmpty, Length, MAX_LENGTH } from "class-validator"

export class VerifyCodeDto {
  @IsNotEmpty()
  @Length(6, 6, { message: "code is invalid" })
  code: string
}
