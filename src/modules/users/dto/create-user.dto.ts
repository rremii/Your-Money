import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar: string
}
