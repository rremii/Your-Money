import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string

  @IsString()
  password?: string

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // userName: string

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // avatar: string
}
