import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}
