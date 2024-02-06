import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Currency } from "../account.interface"

export class EditAccountDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

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
