import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  color: string

  @IsString()
  @IsNotEmpty()
  icon: string
}
